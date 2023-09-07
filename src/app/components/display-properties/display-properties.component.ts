import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Page} from "../../models/Page";
import {PageEvent} from "@angular/material/paginator";

import {MatSnackBar} from '@angular/material/snack-bar';
import {MessengerService} from "../../services/MessengerService";

@Component({
  selector: 'display-properties-app',
  templateUrl: './display-properties.component.html',
  styleUrls: ['./display-properties.component.css']
})
export class DisplayPropertiesComponent{
  @Input() page!: Page;
  @Output() pageEvent = new EventEmitter<number>();

  constructor(private _snackBar: MatSnackBar, private messengerService: MessengerService) {}

  onPageNumberChange(event: PageEvent): void{
    this.pageEvent.emit(event.pageIndex)
  }

  bookmarkSnackbar(text: string): void{
    this._snackBar.open(text, 'Close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3000
    })
  }

  hoveredChild(id: number): void{
    this.messengerService.hoveredPropertyId$.next(id);
  }
}
