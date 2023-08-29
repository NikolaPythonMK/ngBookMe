import {Component, Inject, Input} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SavePropertyRequest} from "../../models/SavePropertyRequest";

@Component({
  selector: 'create-property-dialog',
  templateUrl: './create-property-dialog.component.html',
  styleUrls: ['./create-property-dialog.component.css']
})
export class CreatePropertyDialogComponent {
  // @Input() property!: SavePropertyRequest;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
