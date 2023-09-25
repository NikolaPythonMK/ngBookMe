import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from "@angular/core";
import * as L from "leaflet";
import {MapService} from "../../services/MapService";

@Component({
  selector: 'update-property-map-app',
  templateUrl: './update-property-map.component.html',
  styleUrls: ['./update-property-map.component.css']
})
export class UpdatePropertyMapComponent implements AfterViewInit, OnDestroy{
  @Output() propertyLocationEmit = new EventEmitter<number[]>();
  @Input() set latLng(arr: number[]) {
    if(arr.length){
      this.mapService.setUserLocationMarker(new L.LatLng(arr[0], arr[1]));
      this.mapService.isPropertyMarker('Your property');
    }
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
