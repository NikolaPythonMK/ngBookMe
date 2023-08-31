import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SavePropertyRequest} from "../../models/SavePropertyRequest";

@Component({
  selector: 'create-property-dialog',
  templateUrl: './create-property-dialog.component.html',
  styleUrls: ['./create-property-dialog.component.css']
})
export class CreatePropertyDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CreatePropertyDialogComponent>) {}

  close(): void{
    const confirmation = {
      confirmed: false,
    }
    this.dialogRef.close(confirmation);
  }

  confirm(): void{
    const confirmation = {
      confirmed: true,
    }
    this.dialogRef.close(confirmation);
  }
}
