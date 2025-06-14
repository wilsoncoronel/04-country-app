import { CountryMapper } from './../mappers/country.mapper';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/res-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';
const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  constructor() { }

  private queryCacheCapital= new Map<string, Country[]>();
  private queryCacheCountry= new Map<String, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByRegion(query: Region):Observable<Country[]>{
    const url = `${API_URL}/region/${query}`;
    if(this.queryCacheRegion.has(query)){
      return of (this.queryCacheRegion.get(query)!);
    }

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((resp)=> CountryMapper.mapRESTCountriesToCountryArray(resp)),
      tap(countries=>this.queryCacheRegion.set(query,countries)),
      catchError(error=>{
        return throwError(()=> new Error('No se puedo obtener paises con la region '+query));
      })
    );
  }

  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLowerCase();
    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)!);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((restCountries)=>
        CountryMapper.mapRESTCountriesToCountryArray(restCountries)),
      tap(countries=> this.queryCacheCapital.set(query, countries)),
      catchError(error=>{
        return throwError(
          ()=> new Error('No se puedo obtener países con ese query!!')
        );
      })

    );
  }

  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)) return of (this.queryCacheCountry.get(query)!);
    console.log("LLegando al servido por "+query);
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((restCountries)=>
        CountryMapper.mapRESTCountriesToCountryArray(restCountries)
      ),
      tap(countries=> this.queryCacheCapital.set(query,countries)),
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
