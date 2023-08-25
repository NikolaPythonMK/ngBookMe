import {Component, Input, OnInit} from "@angular/core";
import {InMemoryProperties} from "../../services/InMemoryProperties";
import {Property} from "../../models/Property";

@Component({
  selector: 'property-app',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent{

  @Input() property!: Property;

}
