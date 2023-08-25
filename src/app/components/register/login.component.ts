import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobilePhone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  onSubmit(): void{
    console.log('submitted form: ', this.registerForm.value)
    console.log('invalid: ', this.registerForm.invalid)
    this.isSubmitted = true;
  }

}
