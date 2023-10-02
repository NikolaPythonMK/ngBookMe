import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {DialogRatingResponse} from "../../models/DialogRatingResponse";
import {Property} from "../../models/Property";
@Component({
  selector: 'rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css'],
})

export class RatingDialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<RatingDialogComponent>,
              private fb: FormBuilder,) {
  }

  confirmed: boolean = false;
  starRating = 0;
  ratingForm = this.fb.group({
    userComment: ['', [Validators.required]],
    userRating: ['', [Validators.required]]
  });

  confirm(): void{
    this.confirmed = true;
    this.dialogRef.close({confirmed: this.confirmed,
                          rating: this.starRating,
                          comment: this.ratingForm.get("userComment")!.value} as DialogRatingResponse);
  }
}
