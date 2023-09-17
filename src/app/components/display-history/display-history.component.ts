import {Component, OnInit} from "@angular/core";
import {RecentlyViewedPage} from "../../models/RecentlyViewedPage";
import {RecentlyViewedService} from "../../services/RecentlyViewedService";
import {NotificationService} from "../../services/NotificationService";
import {Router} from "@angular/router";

@Component({
  selector: 'display-history-app',
  templateUrl: './display-history.component.html',
  styleUrls: ['./display-history.component.css', './../../shared-styles/profile-carts.css']
})
export class DisplayHistoryComponent implements OnInit{
  page!: RecentlyViewedPage;

  constructor(private recentlyViewedService: RecentlyViewedService,
              private notificationService: NotificationService,
              private router: Router) {}

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

  visitDetails(id: number): void{
    this.recentlyViewedService.save(id).subscribe();
    this.router.navigate(['property', id]);
  }

  bookmarkSnackbar(text: string): void{
    this.notificationService.success(text);
  }

  deleteAll(): void{
    this.recentlyViewedService.deleteAll().subscribe({
      next: () => {
        this.page.content = [];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteById(propertyId: number): void{
    const recentlyViewedId = this.page.content.find(i => i.property.id === propertyId)!.id;
    this.recentlyViewedService.deleteProperty(recentlyViewedId).subscribe({
      next: () => {
        this.page.content = this.page.content.filter(i => i.property.id !== propertyId);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
