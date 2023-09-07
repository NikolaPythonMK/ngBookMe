import {Component, OnInit} from "@angular/core";
import {PropertyService} from "../../services/PropertyService";
import {Page} from "../../models/Page";

@Component({
  selector: 'saved-properties-app',
  templateUrl: './saved-properties.component.html',
  styleUrls: ['./saved-properties.component.css']
})
export class SavedPropertiesComponent implements OnInit{

  page!: Page;

  constructor(private propertyService: PropertyService) {
  }

  ngOnInit(): void {
    this.propertyService.getBookmarkedProperties().subscribe({
      next: page => {
        this.page = page;
        console.log(this.page.content)

      }
    });
  }

  appendQueryParam(pageNumber: number): void{

  }

}
