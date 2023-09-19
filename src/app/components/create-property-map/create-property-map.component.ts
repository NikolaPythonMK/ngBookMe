import {Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import * as L from "leaflet";
import {Icon, IconOptions, LatLng, LatLngExpression} from "leaflet";
import {MapService} from "../../services/MapService";


// import {MAP_SERVICE_TOKEN, MapService} from "../../services/MapService";
//  constructor(@Inject(MAP_SERVICE_TOKEN) private mapService: MapService)

@Component({
  selector: 'create-property-map-app',
  templateUrl: './create-property-map.component.html',
  styleUrls: ['./create-property-map.component.css']
})
export class CreatePropertyMapComponent implements OnDestroy {
  @Output() propertyLocationEmit = new EventEmitter<number[]>();
  @ViewChild('map') myDiv!: ElementRef;

  constructor(private mapService: MapService) {}

  ngAfterViewInit() {
    this.mapService.initMap();
    this.mapService.showUserLocationMarker().subscribe({
      next: userLocation => {
        this.propertyLocationEmit.emit(userLocation);
      }
    })
    this.mapService.addMarkerPositionChangeOnClick().subscribe(location => {
      this.propertyLocationEmit.emit(location);
    })
  }

  ngOnDestroy() {
    this.mapService.removeMapInstance();
    const divElement = this.myDiv.nativeElement;
    divElement.parentNode.removeChild(divElement);
  }
}
