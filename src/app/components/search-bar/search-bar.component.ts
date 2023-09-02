import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import * as L from 'leaflet';
import {MapService} from "../../services/MapService";

@Component({
  selector: 'seach-bar-app',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  startDate?: Date;
  ednDate?: string;

  @ViewChild('map') myDiv!: ElementRef;

  constructor(private mapService: MapService) {
  }

  ngAfterViewInit(){
    this.mapService.initMap();
    this.mapService.showUserLocationMarker().subscribe();
  }

  ngOnDestroy() {
    this.mapService.removeMapInstance();
    const divElement = this.myDiv.nativeElement;
    divElement.parentNode.removeChild(divElement);
  }


  ngOnInit() {
    // this.map = L.map('map').setView([51.505, -0.09], 30);
    //
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution: '© OpenStreetMap'
    // }).addTo(this.map);
  }

  submit(): void{
    console.log(this.startDate?.toISOString())
  }
}
