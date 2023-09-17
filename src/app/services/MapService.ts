import {Injectable, InjectionToken} from "@angular/core";
import * as L from "leaflet";
import {Icon, IconOptions, LatLng, LatLngExpression} from "leaflet";
import {Observable} from "rxjs";
import {PropertyPopup} from "../models/PropertyPopup";
import {PropertyMarker} from "../models/PropertyMarker";
import {Router} from "@angular/router";

// export const MAP_SERVICE_TOKEN = new InjectionToken<MapService>('MAP_SERVICE_TOKEN');


@Injectable({
  providedIn: 'root'
})
export class MapService{
  private map: L.Map | null = null;
  private userMarker: L.Marker | null = null;
  private propertyMarkers: PropertyMarker[] = [];

  readonly customIcon: Icon<IconOptions> = L.icon({
    iconUrl: '../../../assets/gps-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  priceIcon(propertyPrice: Number){
    const icon = L.divIcon({
      html: `<span class="px-3 pt-1 pb-1 rounded-4 bg-white text-black fw-bolder border border-success">${propertyPrice}&nbsp;MKD</span>`,
      className:"custom-label",
      iconSize: [40, 30],
    });

    return icon;
  }

  constructor(private router: Router) {
  }

  initMap(): void{
    if(!this.map){
      this.map = L.map('map').setView([41.9925, 21.4313], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)
    }
  }

  getMapInstance(): L.Map{
    return this.map!;
  }

  getPropertyMarkers(): PropertyMarker[]{
    return this.propertyMarkers;
  }

  appendMarker(latLng: LatLngExpression, property: PropertyPopup): void{
    const marker = L.marker(latLng, {icon: this.priceIcon(property.price)}).addTo(this.map!);
    marker.bindPopup(L.popup({
      autoPan: true,
      interactive: true,
      content:`
                          <div class="d-flex justify-content-between" style="margin-left: -21px; margin-top: -15px; margin-bottom: -14px">
                            <img src="http://localhost:9090/api/images/${property.id}/${property.image}" width="150" height="150">
                            <div class="d-flex flex-column justify-content-center mb-0" style="margin-left: 10px;">
                              <span class="mb-1">${property.name}</span>
                              <span class="text-body-tertiary mb-1">${property.type}</span>
                              <span class="mb-2">${property.address}</span>
                               <span class="mb-3"><span style="font-weight: bold">${property.rating}</span> (432 reviews)</span>
                               <div class="d-flex justify-content-between align-items-center mb-0">
                                <span style="color: green; font-size: 1.1rem">${property.price} MKD</span>
                                <a class="btn btn-outline-primary btn-sm" href="/property/${property.id}">Details</a>
                               </div>
                             </div>
                          </div>`,
      // content: `<marker-popup-app [property]="${property}"></marker-popup-app>`,
      offset: L.point(15, -10)
    }))

    marker.on('mousemove', () => {
      if(!marker.isPopupOpen()){
        marker.openPopup();
      }
    });

    marker.getPopup()?.addEventListener("mouseout", () => {
      marker.getPopup()?.close();
    });

    this.propertyMarkers.push({
      marker: marker,
      propertyId: property.id
    } as PropertyMarker)
  }

  removeMapInstance(): void{
    this.userMarker = null;
    this.propertyMarkers = [];
    this.map?.remove();
    this.map = null;
  }

  removeAllPropertyMarkers(): void{
    this.propertyMarkers.forEach(m => m.marker.removeFrom(this.map!))
    this.propertyMarkers = [];
  }

  showUserLocationMarker(): Observable<number[]>{
    return new Observable<number[]>((observer) => {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.userMarker = L.marker([(lat) as number, (lng) as number], {icon: this.customIcon}).addTo(this.map!);
            this.userMarker.bindPopup(L.popup({
              content: `<span class="d-flex justify-content-center">You</span>`,
              offset: L.point(0, -10)
            })).openPopup();
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

  openPopupForMarker(id: number, toOpen: boolean): void{
    if(toOpen){
      this.propertyMarkers.find(marker => marker.propertyId === id)?.marker.openPopup();
    }
    else{
      this.propertyMarkers.find(marker => marker.propertyId === id)?.marker.closePopup();
    }
  }

  isPropertyMarker(): void{
    this.userMarker!.bindPopup(L.popup({
      content: `<span class="d-flex justify-content-center">Your property</span>`,
      offset: L.point(0, -10)
    })).openPopup();
  }
}
