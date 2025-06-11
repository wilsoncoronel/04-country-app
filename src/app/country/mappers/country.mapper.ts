import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/res-countries.interface';
export class CountryMapper{
    static mapRestCountryToCountry(item: RESTCountry):Country{
        return {
            cca2: item.cca2,
            flag: item.flag,
            flagSvg: item.flags.svg,
            name: item.translations['spa'].common ?? 'No spanish name',
            capital: item.capital?.length ? item.capital.join(','): 'No tiene capital',
            population: item.population
        };
    }

    static mapRESTCountriesToCountryArray(items: RESTCountry[]):Country[]{
        return items.map(this.mapRestCountryToCountry);
    }
}