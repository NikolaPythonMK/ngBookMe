import {Component, OnInit} from "@angular/core";
import {Page} from "../../models/Page";
import {PropertyService} from "../../services/PropertyService";

@Component({
  selector: 'profile-display-favourites-app',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css', '../../shared-styles/profile-carts.css']
})
export class FavouritesComponent implements OnInit{
  page!: Page;

  constructor(private propertyService: PropertyService){}

  ngOnInit(): void {
    this.propertyService.getBookmarkedProperties().subscribe({
      next: (page) => {
        this.page = page;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  appendQueryParam(event: number): void{

  }
}
