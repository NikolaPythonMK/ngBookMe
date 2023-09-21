import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {PropertyResponse} from "../../models/PropertyResponse";
import {AuthService} from "../../services/AuthService";
import {propertyTypes} from "../../constants/PropertyConstants";

@Component({
  selector: 'property-app',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css', './../../shared-styles/property-cart.css']
})
export class PropertyComponent implements OnInit{
  @Input() property!: Property;
  @Input() removeIcon: boolean = false;
  @Output() bookmarkedEvent = new EventEmitter<string>()
  @Output() removeFromHistoryEvent = new EventEmitter<number>();
  private _propertyType!: string;

  constructor(private propertyService: PropertyService, private authService: AuthService) {}

  ngOnInit() {
    console.log(this.property);
    this.propertyType = propertyTypes.find(i => i.value === this.property.propertyType)!.name;
  }

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

  toRemove(event: Event): void{
    event.stopPropagation();
    this.removeFromHistoryEvent.emit(this.property.id);
  }

  isUserAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }

  set propertyType(type: string){
    this._propertyType = type;
  }

  get propertyType(): string{
    return this._propertyType;
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  satisfaction(n: number): string {
    const satisfactionScale: { [key: number]: string } = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    };
  
    if (n >= 1 && n <= 5) {
      return satisfactionScale[Math.trunc(n)];
    } else {
      return "Invalid input";
    }
  }
}
