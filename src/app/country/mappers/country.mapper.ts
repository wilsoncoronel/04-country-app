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
            population: item.population,
            region: item.region,
            area: item.area,
            continent: item.continents?.length ? item.continents.join(', '): 'No continent specific',
            languages: item.languages.est,
            latLong : item.latlng?.length ? item.latlng.join(', '): 'No languages specific',
        };
    }

    static mapRESTCountriesToCountryArray(items: RESTCountry[]):Country[]{
        return items.map(this.mapRestCountryToCountry);
    }
}