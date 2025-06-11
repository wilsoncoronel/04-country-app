import {  Component, inject, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { ItemInfo } from '../../../interfaces/item.interface';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  country=input.required<Country>();
  
}
