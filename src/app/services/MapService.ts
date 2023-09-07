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

  readonly propertyIcon: Icon<IconOptions> = L.icon({
    iconUrl: '../../../assets/property-icon.png',
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
  }

  getMapInstance(): L.Map{
    return this.map!;
  }

  getPropertyMarkers(): L.Marker[]{
    return this.propertyMarkers;
  }

  appendMarker(latLng: LatLngExpression, property: PropertyPopup): void{
    const marker = L.marker(latLng, {icon: this.propertyIcon}).addTo(this.map!);
    marker.bindPopup(`<div class="d-flex justify-content-between" style="margin-left: -21px; margin-top: -15px; margin-bottom: -14px">
                            <img src="http://localhost:9090/api/images/${property.id}/${property.image}" width="150" height="150">
                            <div class="d-flex flex-column justify-content-center mb-0" style="margin-left: 10px;">
                              <span class="mb-0">${property.name}</span>
                              <span class="text-body-tertiary mb-1">HOTEL</span>
                              <span class="mb-1">Street X, Number Y</span>
                               <span class="mb-1"><b>${property.rating}</b> (432 reviews)</span>
                               <div class="d-flex justify-content-between align-items-center mb-0">
                                <span style="color: green; font-size: 1.1rem">${property.price} MKD</span>
                                <button class="btn btn-outline-success btn-sm m-2">Details</button>
                               </div>
                             </div>
                                </div>`);

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

            const popup = new L.Popup()
              .setLatLng([(lat + 1.145) as number, (lng + 1.145) as number])
              .setContent("<span style='margin-left: 10px'>You</span>");
            this.userMarker.bindPopup(popup).openPopup();

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
