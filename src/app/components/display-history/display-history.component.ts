import {Component, OnInit} from "@angular/core";
import {RecentlyViewedPage} from "../../models/RecentlyViewedPage";
import {RecentlyViewedService} from "../../services/RecentlyViewedService";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'display-history-app',
  templateUrl: './display-history.component.html',
  styleUrls: ['./display-history.component.css', './../../shared-styles/profile-carts.css']
})
export class DisplayHistoryComponent implements OnInit{
  page!: RecentlyViewedPage;

  constructor(private recentlyViewedService: RecentlyViewedService,
              private _snackBar: MatSnackBar,) {}

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

  bookmarkSnackbar(text: string): void{
    this._snackBar.open(text, 'Close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3000
    })
  }

  deleteAll(): void{

  }
}
