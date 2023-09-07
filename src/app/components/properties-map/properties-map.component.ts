import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MapService} from "../../services/MapService";
import * as L from "leaflet";
import {Property} from "../../models/Property";
import {LatLngExpression} from "leaflet";
import {PropertyPopup} from "../../models/PropertyPopup";
import {MessengerService} from "../../services/MessengerService";

@Component({
  selector: 'properties-map-app',
  templateUrl: './properties-map.component.html',
  styleUrls: ['./properties-map.component.css']
})
export class PropertiesMapComponent {
  @Output() enlargeMapEvent = new EventEmitter<boolean>();
  @Input() enlarged!: boolean;
  @Input() properties: Property[] = [];
  @ViewChild('map') myDiv!: ElementRef;


  constructor(private mapService: MapService,
              private messengerService: MessengerService) {}

  ngAfterViewInit(){
    this.mapService.initMap();
    this.drawMarkers();
    this.mapService.showUserLocationMarker().subscribe();
    this.messengerService.hoveredPropertyId$.subscribe(propertyId => {
      this.mapService.openPopupForMarker(propertyId);
    })
  }

  ngOnDestroy() {
    this.mapService.removeMapInstance();
    const divElement = this.myDiv.nativeElement;
    divElement.parentNode.removeChild(divElement);
  }

  drawMarkers(): void{
    for(let property of this.properties){
      console.log(property)
      const propertyInfo = {
        id: property.id,
        name: property.propertyName,
        price: property.propertyPrice,
        image: property.propertyImage,
        rating: "8-8 excellent"
      } as PropertyPopup;
      console.log(propertyInfo.image)
      this.mapService.appendMarker(this.extractLatLng(property.propertyLocation), propertyInfo);
    }
  }

  private extractLatLng(location: string): LatLngExpression{
    const latLng = location.split(';');
    const lat = parseFloat(latLng[0]);
    const lng = parseFloat(latLng[1]);
    return [lat, lng] as LatLngExpression;
  }

  enlargeMap(){
    this.enlargeMapEvent.emit(true);
  }

  collapseMap(){
    this.enlargeMapEvent.emit(false);
  }
}
