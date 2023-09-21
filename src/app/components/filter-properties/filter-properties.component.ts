import {Component} from "@angular/core";
import { propertyTypes } from "src/app/constants/PropertyConstants";
import { propertyAmenities } from "src/app/constants/AmenitiesConstants";
import { FormControl } from "@angular/forms";
@Component({
  selector: 'filter-app',
  templateUrl: './filter-properties.component.html',
  styleUrls: ['./filter-properties.component.css']
})
export class FilterPropertiesComponent {
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
}
