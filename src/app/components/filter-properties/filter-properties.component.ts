import {Component, EventEmitter, Input, Output} from "@angular/core";
import { propertyTypes } from "src/app/constants/PropertyConstants";
import { propertyAmenities } from "src/app/constants/AmenitiesConstants";
import { FormControl } from "@angular/forms";
import {FilteredData} from "../../models/FilteredData";
@Component({
  selector: 'filter-app',
  templateUrl: './filter-properties.component.html',
  styleUrls: ['./filter-properties.component.css']
})
export class FilterPropertiesComponent {
  @Input() set filteredData(filter: boolean){
    if(filter){
      this.onSubmit();
    }
  }
  @Output() filteredDataEvent = new EventEmitter<FilteredData>();

  selectedPropertyTypes: string[] = [];
  selectedAmenities: string[] = [];
  selectedRatings: number[] = [];
  selectedRange: number[] = [];

  propertyTypes = propertyTypes;
  propertyAmenities = propertyAmenities;

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
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

  formatLabel(value: number): string {
    return value.toFixed(0);
  }

  onTypeSubmit(type: string): void{
    if(this.selectedPropertyTypes.includes(type)){
      this.selectedPropertyTypes = this.selectedPropertyTypes.filter(i => i !== type);
    }
    else{
      this.selectedPropertyTypes.push(type);
    }
    console.log(this.selectedPropertyTypes)
  }

  onAmenitySubmit(amenity: string): void{
    if(this.selectedAmenities.includes(amenity)){
      this.selectedAmenities = this.selectedAmenities.filter(i => i !== amenity);
    }
    else{
      this.selectedAmenities.push(amenity);
    }
    console.log(this.selectedAmenities)
  }

  onRatingSubmit(rating: number): void{
    if(this.selectedRatings.includes(rating)){
      this.selectedRatings = this.selectedRatings.filter(i => i !== rating);
    }
    else{
      this.selectedRatings.push(rating);
    }
    console.log(this.selectedRatings);
  }

  onPriceSubmit(price: any, isMin: boolean): void{
    if(isMin){
      this.selectedRange[0] = price;
    }
    else{
      this.selectedRange[1] = price;
    }
    console.log(this.selectedRange)
  }

  onSubmit(): void{
    const filteredData = {
      propertyTypes: this.selectedPropertyTypes.join(';'),
      propertyAmenities: this.selectedAmenities.join(';'),
      propertyRating: this.selectedRatings.join(';'),
      propertyPriceRange: this.selectedRange.join(';')
    } as FilteredData;
    this.filteredDataEvent.emit(filteredData);
  }
}
