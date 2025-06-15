import { ChangeDetectionStrategy, Component, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countries = input.required<Country[]>();
  activatedRoute= inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')??'';
  router = inject(Router);

  query = linkedSignal(()=> this.queryParam);
  
  countryService = inject(CountryService);
  countryResource = rxResource({
    request: ()=>({query: this.query()}),
    loader:({request})=>{
      if(!request.query) return of ([]);
      this.router.navigate(['/country/by-country'],{
        queryParams:{
          query: request.query,
        }
      });
      return this.countryService.searchByCountry(request.query);
    },
  });
}
