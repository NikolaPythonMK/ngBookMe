import {Component, ViewChild} from "@angular/core";
import * as L from 'leaflet';
import 'leaflet.locatecontrol';
import { LatLngExpression } from 'leaflet';


@Component({
  selector: 'create-property-map-app',
  templateUrl: './create-property-map.component.html',
  styleUrls: ['./create-property-map.component.css']
})
export class CreatePropertyMapComponent {
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initializeMap();
    this.getUserLocation();
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 30);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private getUserLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const userMarker = L.marker([lat, lng]).addTo(this.map);
        userMarker.bindPopup('Your Location').openPopup();

        // Add another marker at a specific location
        const markerCoords: LatLngExpression = [(lat + 0.01) as number, (lng - 0.02) as number];
        const customMarker = L.marker(markerCoords).addTo(this.map);
        customMarker.bindPopup('Custom Marker').openPopup();

        this.map.setView([lat, lng], 15);
      }, error => {
        console.error('Error getting user location:', error);
      });
    } else {
      console.error('Geolocation is not available.');
    }
  }




}
