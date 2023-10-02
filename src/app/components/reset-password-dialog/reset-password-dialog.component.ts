import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResetPasswordDialogResponse} from "../../models/ResetPasswordDialogResponse";

@Component({
  selector: 'reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit{
  userForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit(): void{
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.dialogRef.close({isValid: true, value: formData.email} as ResetPasswordDialogResponse);
    }
    else{
      this.dialogRef.close({isValid: false} as ResetPasswordDialogResponse);
    }
  }
}
