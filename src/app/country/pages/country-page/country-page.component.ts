import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'country-page',
  imports: [],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);
  countryResource= rxResource({
    request: ()=> ({code: this.countryCode}),
    loader: ({request})=>this.countryService.searchCountryByAlphaCode(request.code),
  })
}
