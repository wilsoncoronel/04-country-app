import { Component, inject, input, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  selectedRegion = signal<Region|null>(null);
  countries = input.required<Country[]>();
  query = signal('');
  countryService= inject(CountryService);

  countryResource= rxResource({
    request: ()=>({query: this.selectedRegion()}),
    loader:({request})=>{
      if(!request.query) return of([]);
      return this.countryService.searchByRegion(request.query);
    },
  });
  
}
