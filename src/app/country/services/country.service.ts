import { CountryMapper } from './../mappers/country.mapper';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/res-countries.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  constructor() { }

  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((restCountries)=>
        CountryMapper.mapRESTCountriesToCountryArray(restCountries)
      ),
      catchError(error=>{
        return throwError(
          ()=> new Error('No se puedo obtener países con ese query!!')
        );
      })

    );
  }

  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((restCountries)=>
        CountryMapper.mapRESTCountriesToCountryArray(restCountries)
      ),
      delay(3000),
      catchError(error=>{
        return throwError(
          ()=> Error('No se pudo obtener países con ese query!!')
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string){
    const url = `${API_URL}/alpha/${code}`;
    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((restCountries)=>
        CountryMapper.mapRESTCountriesToCountryArray(restCountries)
      ),
      map(countries=>countries.at(0)),
      catchError(error=>{
        return throwError(
          ()=> Error(`No se pudo obtener un país con ese código ${code}!!`)
        );
      })
    );
  }
}
