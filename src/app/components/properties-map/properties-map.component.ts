import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {MapService} from "../../services/MapService";
import * as L from "leaflet";
import {Property} from "../../models/Property";
import {LatLngExpression} from "leaflet";
import {PropertyPopup} from "../../models/PropertyPopup";

@Component({
  selector: 'properties-map-app',
  templateUrl: './properties-map.component.html',
  styleUrls: ['./properties-map.component.css']
})
export class PropertiesMapComponent {
  @Input() properties: Property[] = [];
  @ViewChild('map') myDiv!: ElementRef;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(){
    this.mapService.initMap();
    this.drawMarkers();
    this.mapService.showUserLocationMarker().subscribe();
  }

  ngOnDestroy() {
    this.mapService.removeMapInstance();
    const divElement = this.myDiv.nativeElement;
    divElement.parentNode.removeChild(divElement);
  }

  drawMarkers(): void{
    for(let property of this.properties){
      const propertyInfo = {
        id: property.id,
        name: property.propertyName,
        price: property.propertyPrice,
        image: property.propertyImage.split("\\")[2],
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
}
