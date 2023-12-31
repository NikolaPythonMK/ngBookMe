import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Page} from "../../models/Page";
import {PageEvent} from "@angular/material/paginator";

import {MatSnackBar} from '@angular/material/snack-bar';
import {MessengerService} from "../../services/MessengerService";
import {Router} from "@angular/router";
import {RecentlyViewedService} from "../../services/RecentlyViewedService";
import {NotificationService} from "../../services/NotificationService";

@Component({
  selector: 'display-properties-app',
  templateUrl: './display-properties.component.html',
  styleUrls: ['./display-properties.component.css']
})
export class DisplayPropertiesComponent{
  @Input() page!: Page;
  @Output() pageEvent = new EventEmitter<number>();

  constructor(private notificationService: NotificationService,
              private messengerService: MessengerService,
              private router: Router,
              private recentlyViewedService: RecentlyViewedService) {}

  onPageNumberChange(event: PageEvent): void{
    this.pageEvent.emit(event.pageIndex)
  }

  bookmarkSnackbar(text: string): void{
    this.notificationService.success(text);
  }

  hoveredChild(id: number, toOpen: boolean = true): void{
    this.messengerService.hoveredPropertyId$.next({id: id, toOpen: toOpen});
  }

  visitDetails(id: number){
    this.recentlyViewedService.save(id).subscribe();
    this.router.navigate(['property', id]);
  }
}
