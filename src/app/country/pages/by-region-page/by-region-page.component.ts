import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(value: string): Region{
  value = value.toLowerCase();
   const validRegions: Record<string, Region>={
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic', 
  };
  return validRegions[value]??'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')??'';
  router = inject(Router);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  selectedRegion = linkedSignal<Region>(()=> validateQueryParam(this.queryParam));
  countries = input.required<Country[]>();
  countryService= inject(CountryService);

  countryResource= rxResource({
    request: ()=>({query: this.selectedRegion()}),
    loader:({request})=>{
      if(!request.query) return of([]);
      this.router.navigate(['/country/by-region'],{
        queryParams:{
          query: request.query,
        }
      });
      return this.countryService.searchByRegion(request.query);
    },
  });
  
}
