import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {PropertyResponse} from "../../models/PropertyResponse";
import {AuthService} from "../../services/AuthService";

@Component({
  selector: 'property-app',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css', './../../shared-styles/property-cart.css']
})
export class PropertyComponent{
  @Input() property!: Property;
  @Output() bookmarkedEvent = new EventEmitter<string>()

  constructor(private propertyService: PropertyService, private authService: AuthService) {}

  addBookmark(event: Event): void{
    event.stopPropagation();
    this.propertyService.bookmarkProperty(this.property.id).subscribe({
      next: () => {
        this.bookmarkedEvent.emit('Bookmark Added!');
        this.property.bookmarked = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeBookmark(event: Event): void{
    event.stopPropagation();
    this.propertyService.removeBookmark(this.property.id).subscribe({
      next: () => {
        this.bookmarkedEvent.emit('Bookmark Removed!');
        this.property.bookmarked = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  isUserAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }
}
