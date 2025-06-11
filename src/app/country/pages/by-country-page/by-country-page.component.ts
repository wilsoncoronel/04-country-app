import { ChangeDetectionStrategy, Component, inject, input, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countries = input.required<Country[]>();
  query = signal('');
  countryService = inject(CountryService);
  countryResource = rxResource({
    request: ()=>({query: this.query()}),
    loader:({request})=>{
      if(!request.query) return of ([]);
      return this.countryService.searchByCountry(request.query);
    },
  });
}
