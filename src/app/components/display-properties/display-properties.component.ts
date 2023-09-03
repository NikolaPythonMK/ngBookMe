import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Property} from "../../models/Property";
import {InMemoryProperties} from "../../services/InMemoryProperties";
import {Page} from "../../models/Page";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'display-properties-app',
  templateUrl: './display-properties.component.html',
  styleUrls: ['./display-properties.component.css']
})
export class DisplayPropertiesComponent{
  @Input() page!: Page;
  @Output() pageEvent = new EventEmitter<number>();

  onPageNumberChange(event: PageEvent): void{
    this.pageEvent.emit(event.pageIndex)
  }
}
