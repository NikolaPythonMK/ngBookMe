import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'reset-password-app',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  form!: FormGroup;
  hide: boolean = false;
  displayErrorMsg: boolean = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      newPassword: ['', []],
      confirmNewPassword: ['', []]
    })
  }

  isInputValid(): boolean{
    return this.form.get('newPassword')!.valid && this.form.get('confirmNewPassword')!.valid;
  }

  passwordMatch(): boolean{
    return this.form.get('newPassword')!.value === this.form.get('confirmNewPassword')!.value;
  }

  isValid(control: string): boolean {
    return this.form.get(control)!.invalid &&
      (this.form.get(control)!.dirty || this.form.get(control)!.touched);
  }

  onSubmit(): void{
    if(this.isInputValid() && this.passwordMatch()){

      this.displayErrorMsg = false;
    }
    else{
      this.displayErrorMsg = true;
    }
  }
}
