import {Component, OnInit} from "@angular/core";
import {Property} from "../../models/Property";
import {InMemoryProperties} from "../../services/InMemoryProperties";


@Component({
  selector: 'display-properties-app',
  templateUrl: './display-properties.component.html',
  styleUrls: ['./display-properties.component.css']
})
export class DisplayPropertiesComponent implements OnInit{
  properties: Property[] = [];

  constructor(private propertyService: InMemoryProperties) {}

  ngOnInit() {
    this.propertyService.getAll().subscribe(properties => {
      this.properties = properties;
    });
  }
}
