import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MapService} from "../../services/MapService";
import * as L from "leaflet";
import {Property} from "../../models/Property";
import {LatLngExpression} from "leaflet";
import {PropertyPopup} from "../../models/PropertyPopup";
import {MessengerService} from "../../services/MessengerService";
import {PropertyService} from "../../services/PropertyService";

@Component({
  selector: 'properties-map-app',
  templateUrl: './properties-map.component.html',
  styleUrls: ['./properties-map.component.css']
})
export class PropertiesMapComponent {
  @Output() enlargeMapEvent = new EventEmitter<boolean>();
  @Input() enlarged!: boolean;
  properties: Property[] = [];
  @ViewChild('map') myDiv!: ElementRef;


  constructor(private mapService: MapService,
              private messengerService: MessengerService,
              private propertyService: PropertyService) {}


  ngAfterViewInit(){
    this.init();
    this.messengerService.properties$.subscribe(next => {
      this.properties = next as Property[];
      this.drawMarkers();
    })
  }

  ngOnDestroy() {
    this.mapService.removeMapInstance();
    const divElement = this.myDiv.nativeElement;
    divElement.parentNode.removeChild(divElement);
  }

  private init(){
    this.mapService.initMap();
    this.drawMarkers();
    this.mapService.showUserLocationMarker().subscribe();
    this.messengerService.hoveredPropertyId$.subscribe(next => {
      this.mapService.openPopupForMarker(next.id, next.toOpen);
    })
  }

  drawMarkers(): void{
    this.mapService.removeAllPropertyMarkers();
    for(let property of this.properties){
      const propertyInfo = {
        id: property.id,
        name: property.propertyName,
        address: property.propertyAddress,
        type: property.propertyType,
        price: property.propertyPrice,
        image: property.propertyImage,
        rating: Number(property.propertyAverageRating.toFixed(1)) === 0 ? 'Property Not Rated Yet.' : String(property.propertyAverageRating.toFixed(1) + " - " + this.satisfaction(property.propertyAverageRating)),
        numRatings: Number(property.propertyNumberOfRatings)
      } as PropertyPopup;
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
    this.propertyService.getAllProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.drawMarkers();
      }
    })
  }

  collapseMap(){
    this.enlargeMapEvent.emit(false);
    this.messengerService.properties$.subscribe(next => {
      this.properties = next as Property[];
      this.drawMarkers();
    })
  }

  satisfaction(n: number): string {
    const satisfactionScale: { [key: number]: string } = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    };

    if (n >= 1 && n <= 5) {
      return satisfactionScale[Math.trunc(n)];
    } else {
      return "Invalid input";
    }
  }
}
