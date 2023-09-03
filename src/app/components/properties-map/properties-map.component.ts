import {Component, ElementRef, ViewChild} from "@angular/core";
import {MapService} from "../../services/MapService";

@Component({
  selector: 'properties-map-app',
  templateUrl: './properties-map.component.html',
  styleUrls: ['./properties-map.component.css']
})
export class PropertiesMapComponent {

  @ViewChild('map') myDiv!: ElementRef;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(){
    this.mapService.initMap();
    this.mapService.showUserLocationMarker().subscribe();
  }

  ngOnDestroy() {
    this.mapService.removeMapInstance();
    const divElement = this.myDiv.nativeElement;
    divElement.parentNode.removeChild(divElement);
  }
}
