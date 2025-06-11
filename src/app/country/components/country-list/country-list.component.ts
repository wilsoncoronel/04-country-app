import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent { 

  countries = input.required<Country[]>();

  errorMessage= input<string | unknown | null>();
  isLoading= input<boolean>(false);
  isEmpty= input<boolean>(false);
}
