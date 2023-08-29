import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import * as L from 'leaflet';

@Component({
  selector: 'seach-bar-app',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  map!: L.Map;
  startDate?: Date;
  ednDate?: string;

  ngAfterViewInit() {
    this.map = L.map('map').setView([51.505, -0.09], 30);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  submit(): void{
    console.log(this.startDate?.toISOString())
  }
}
