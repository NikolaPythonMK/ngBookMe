import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'seach-bar-app',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
}
