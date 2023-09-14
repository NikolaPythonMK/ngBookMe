import {Component, OnInit} from "@angular/core";
import {Page} from "../../models/Page";
import {PropertyService} from "../../services/PropertyService";

@Component({
  selector: 'display-user-properties-app',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.css', './../../shared-styles/profile-carts.css']
})
export class UserPropertiesComponent implements OnInit{
  page!: Page;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getPropertiesForUser().subscribe({
      next: (page) => {
        this.page = page;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  appendQueryParam(pageNumber: number){

  }

}
