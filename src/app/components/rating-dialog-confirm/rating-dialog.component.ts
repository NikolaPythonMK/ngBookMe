import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
@Component({
  selector: 'rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css'],
})

export class RatingDialogComponent{

  constructor(public dialogRef: MatDialogRef<RatingDialogComponent>,
              private fb: FormBuilder,) {}

  confirmed: boolean = false;
  starRating = 0;
  ratingForm = this.fb.group({
    userComment: ['', [Validators.required]],
    userRating: ['', [Validators.required]]
  });

  confirm(): void{
    this.confirmed = true;
    this.dialogRef.close(this.confirmed);
  }

  onSubmit() {

  }
}
