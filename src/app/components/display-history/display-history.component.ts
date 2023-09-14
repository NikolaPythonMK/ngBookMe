import {Component, OnInit} from "@angular/core";
import {RecentlyViewedPage} from "../../models/RecentlyViewedPage";
import {RecentlyViewedService} from "../../services/RecentlyViewedService";

@Component({
  selector: 'display-history-app',
  templateUrl: './display-history.component.html',
  styleUrls: ['./display-history.component.css', './../../shared-styles/profile-carts.css']
})
export class DisplayHistoryComponent implements OnInit{
  page!: RecentlyViewedPage;

  constructor(private recentlyViewedService: RecentlyViewedService,) {}

  ngOnInit(): void {
    this.recentlyViewedService.getAll().subscribe({
      next: (page) => {
        this.page = page;
        console.log(this.page);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
