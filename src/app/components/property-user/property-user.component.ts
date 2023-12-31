import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {AuthService} from "../../services/AuthService";
import {Event} from "@angular/router";

@Component({
  selector: 'property-user-app',
  templateUrl: './property-user.component.html',
  styleUrls: ['./property-user.component.css', './../../shared-styles/property-cart.css']
})
export class PropertyUserComponent {
  @Input() property!: Property;
  @Output() deletePropertyEvent = new EventEmitter<number>();

  constructor(private propertyService: PropertyService, private authService: AuthService) {}

  deleteProperty(id: number, event: MouseEvent): void{
    event.stopPropagation();
    this.deletePropertyEvent.emit(id);
  }
}
