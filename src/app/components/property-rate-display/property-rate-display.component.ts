import {Component, Input, SimpleChanges} from "@angular/core";
import {ReservationDetail} from "../../models/ReservationDetail";
import {Property} from "../../models/Property";

@Component({
  selector: 'property-rating-display',
  templateUrl: './property-rate-display.component.html',
  styleUrls: ['./property-rate-display.component.css'],
})

export class PropertyRateDisplayComponent {
  @Input() property!: Property;
  images : string [] = [];
  activeSlideIndex: number = 0;
  ngOnChanges(changes: SimpleChanges): void {
    this.images = String(this.property.propertyImages).split(";");
    this.images = this.images.slice(0, this.images.length - 1);
  }

  prevSlide(): void{
    if (this.activeSlideIndex > 0) {
      this.activeSlideIndex--;
    }
  }

  nextSlide() {
    if (this.activeSlideIndex < this.images.length - 1) {
      this.activeSlideIndex++;
    }
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
