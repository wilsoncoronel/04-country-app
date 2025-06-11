import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  value = output<string>();
  placeHolder = input("Buscar");
  
}
