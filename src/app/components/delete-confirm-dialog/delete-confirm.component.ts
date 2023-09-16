import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteConfirmationData} from "./DeleteConfirmationData";

@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {

  confirmed: boolean = false;

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>) {}

  confirm(): void{
    this.confirmed = true;
    this.dialogRef.close(this.confirmed);
  }
}
