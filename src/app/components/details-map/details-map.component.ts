import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import * as L from "leaflet";
import { MapService } from "src/app/services/MapService";

@Component({
    selector: 'details-map-app',
    templateUrl: './details-map.component.html',
    styleUrls: ['./details-map.component.css']
})
export class DetailsMapComponent{
  @Output() propertyLocationEmit = new EventEmitter<number[]>();
  @Input() set latLng(location : string){
    this.mapService.initMap();
    this.mapService.setUserLocationMarker(new L.LatLng(Number(location.split(';')[0]), Number(location.split(';')[1])));
  }
  @Input() set name (propertyName : string){
    this.mapService.isPropertyMarker(propertyName);
  }
  @ViewChild('map') myDiv!: ElementRef;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initMap();
    this.mapService.addMarkerPositionChangeOnClick().subscribe(location => {
      this.propertyLocationEmit.emit(location);
    })
  }

  ngOnDestroy(): void {
    this.mapService.removeMapInstance();
    const divElement = this.myDiv.nativeElement;
    divElement.parentNode.removeChild(divElement);
  }
}
