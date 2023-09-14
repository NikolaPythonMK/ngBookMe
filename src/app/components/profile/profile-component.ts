import {Component, OnInit} from "@angular/core";
import {RecentlyViewed} from "../../models/RecentlyViewed";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {RecentlyViewedService} from "../../services/RecentlyViewedService";
import {RecentlyViewedPage} from "../../models/RecentlyViewedPage";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Router} from "@angular/router";
import { Location } from '@angular/common';


@Component({
  selector: 'profile-app',
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.css']
})
export class ProfileComponent{
  title: string = 'Recently viewed';


  constructor(private propertyService: PropertyService,
              private recentlyViewedService: RecentlyViewedService,
              private router: Router,
              private location: Location) {}

  onTabChange(event: MatTabChangeEvent): void{
    if(event.index === 0){
      this.router.navigate(['/profile/recently-viewed'])
    }
    else if(event.index === 1){
      this.router.navigate(['/profile/bookings'])
    }
    else if(event.index === 2){
      this.router.navigate(['/profile/my-properties'])
    }
    else{
      this.router.navigate(['/profile/bookmarks'])
    }
  }

}
