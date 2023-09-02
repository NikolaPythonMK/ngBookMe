import {Component, ElementRef, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import * as L from "leaflet";
import {Icon, IconOptions, LatLng, LatLngExpression} from "leaflet";
import {MapService} from "../../services/MapService";

// import {MAP_SERVICE_TOKEN, MapService} from "../../services/MapService";
//  constructor(@Inject(MAP_SERVICE_TOKEN) private mapService: MapService)

@Component({
  selector: 'map-app',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnDestroy, OnInit{
  @Output() propertyLocationEmit = new EventEmitter<number[]>();
  @ViewChild('map') myDiv!: ElementRef;

  constructor(private mapService: MapService) {
    console.log('MapComponent')
  }

  ngAfterViewInit() {
    this.mapService.initMap();
    console.log('initMap() called')
    this.mapService.showUserLocationMarker().subscribe({
      next: userLocation => {
        this.propertyLocationEmit.emit(userLocation);
      }
    })
    this.mapService.addMarkerPositionChangeOnClick().subscribe(location => {
      this.propertyLocationEmit.emit(location);
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.mapService.removeMapInstance();
    const divElement = this.myDiv.nativeElement;
    divElement.parentNode.removeChild(divElement);
  }


}
