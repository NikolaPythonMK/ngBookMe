import {Injectable, InjectionToken} from "@angular/core";
import * as L from "leaflet";
import {Icon, IconOptions, LatLng, LatLngExpression} from "leaflet";
import {Observable} from "rxjs";
import {PropertyPopup} from "../models/PropertyPopup";

// export const MAP_SERVICE_TOKEN = new InjectionToken<MapService>('MAP_SERVICE_TOKEN');


@Injectable({
  providedIn: 'root'
})
export class MapService{
  private map: L.Map | null = null;
  private userMarker: L.Marker | null = null;
  private propertyMarkers: L.Marker[] = [];

  readonly customIcon: Icon<IconOptions> = L.icon({
    iconUrl: '../../../assets/gps-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  constructor() {
  }

  initMap(): void{
    if(!this.map){
      this.map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)
    }

    L.marker([43.00, 42.00], {icon: this.customIcon}).addTo(this.map!);
    L.marker([44.99, 41.99], {icon: this.customIcon}).addTo(this.map!);
    L.marker([45.99, 21.43], {icon: this.customIcon}).addTo(this.map!);
  }

  getMapInstance(): L.Map{
    return this.map!;
  }

  getPropertyMarkers(): L.Marker[]{
    return this.propertyMarkers;
  }

  appendMarker(latLng: LatLngExpression, property: PropertyPopup): void{
    const marker = L.marker(latLng, {icon: this.customIcon}).addTo(this.map!);
    marker.bindPopup(`<p>${property.name}</p><p>${property.price} MKD</p><p>${property.rating}</p><img src="http://localhost:9090/uploads/${property.id}/${property.image}" width="100" height="100">`);

    marker.openPopup();
  }

  removeMapInstance(): void{
    this.userMarker = null;
    this.propertyMarkers = [];
    this.map?.remove();
    this.map = null;
  }

  showUserLocationMarker(): Observable<number[]>{
    return new Observable<number[]>((observer) => {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.userMarker = L.marker([(lat) as number, (lng) as number], {icon: this.customIcon}).addTo(this.map!);
            this.map!.setView([lat, lng], 15);
            observer.next([lat, lng])
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else{
        observer.error('Geolocation is not supported.')
      }
    })
  }

  addMarkerPositionChangeOnClick(): Observable<number[]>{
    return new Observable<number[]>((observer) => {
      this.map!.on('click', (event: L.LeafletMouseEvent) => {
        const clickedLocation = event.latlng;
        this.setUserLocationMarker(clickedLocation);
        observer.next([clickedLocation.lat, clickedLocation.lng] as number[]);
      })
    })
    // this.map.on('click', (event: L.LeafletMouseEvent) => {
    //   const clickedLocation = event.latlng;
    //   this.setUserLocationMarker(clickedLocation);
    // })
  }

  setUserLocationMarker(newLocation: L.LatLng): void{
    if(!this.userMarker){
      this.userMarker = L.marker(newLocation, {icon: this.customIcon}).addTo(this.map!)
    }
    else{
      this.userMarker.setLatLng(newLocation);
    }
  }

  getUserMarkerLocation(): number[] | null{
    if(this.userMarker){
      const lat = this.userMarker?.getLatLng().lat;
      const lng = this.userMarker?.getLatLng().lng;
      return [lat, lng] as number[];
    }
    return null;
  }
}
