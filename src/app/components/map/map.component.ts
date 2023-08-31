import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import * as L from "leaflet";
import {Icon, IconOptions, LatLng, LatLngExpression} from "leaflet";

@Component({
  selector: 'map-app',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnDestroy{
  private map!: L.Map;
  private userLocationMarker: L.Marker | null = null;
  @Output() propertyLocationEmit = new EventEmitter<number[]>();

  readonly customIcon: Icon<IconOptions> = L.icon({
    iconUrl: '../../../assets/gps-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  ngAfterViewInit(): void {
    this.initMap();
    this.ShowUserLocation();
    this.emit();
  }

  ngOnDestroy() {
    this.map.remove().off();
    console.log('Destroyed')
  }

  emit(): void{
    const lat = this.userLocationMarker!.getLatLng().lat;
    const lng = this.userLocationMarker!.getLatLng().lng;
    this.propertyLocationEmit.emit([lat, lng])
  }

  private initMap(): void{
    if(!this.map){
      this.map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
      this.addMapClickListener();
    }
  }

  getMapInstance(): L.Map{
    return this.map;
  }

  private ShowUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.userLocationMarker = L.marker([(lat) as number, (lng) as number], { icon: this.customIcon }).addTo(this.map)
        this.map.setView([lat, lng], 15);
      });
    }
  }

  private addMapClickListener(): void {
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const clickedLocation = event.latlng;
      this.updateUserLocationMarker(clickedLocation);
    });
  }

  private updateUserLocationMarker(newLocation: L.LatLng): void {
    if (!this.userLocationMarker) {
      this.userLocationMarker = L.marker(newLocation, { icon: this.customIcon }).addTo(this.map);
    } else {
      this.userLocationMarker.setLatLng(newLocation);
    }
    this.emit();
  }

}
