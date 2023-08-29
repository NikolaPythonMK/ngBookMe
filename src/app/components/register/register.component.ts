import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/AuthService";
import {RegisterRequest} from "../../models/RegisterRequest";
import {Router} from "@angular/router";
import {MessengerService} from "../../services/MessengerService";

@Component({
  selector: 'login-app',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './../../shared-styles/auth.css']
})
export class RegisterComponent implements OnInit{
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobilePhone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  confirmPassword = new FormControl('', [Validators.required])

  isSubmitted: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  errorMessage?: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private messengerService: MessengerService) {}

  ngOnInit(): void {
    // this.registerForm.get('roleId')?.valueChanges.subscribe(roleId => {
    //   console.log('SEND API Request AND UPDATE ROLE', roleId)
    // });
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.registerForm.valid && !this.hasPasswordMismatch()){
      this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: () => {
          this.messengerService.accountRegistered();
          this.router.navigate(["login"])
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = "There was a problem with the registration... Please try again later."
        },
      })
    }
  }

  isValid(control: string): boolean{
    return this.registerForm.get(control)!.invalid &&
      (this.registerForm.get(control)!.dirty || this.registerForm.get(control)!.touched || this.isSubmitted);
  }

  hasRequiredError(control: string): boolean{
    return this.registerForm.get(control)!.hasError('required') &&
      (this.registerForm.get(control)!.dirty || this.registerForm.get(control)!.touched || this.isSubmitted);
  }

  hasInvalidEmail(): boolean{
    return this.registerForm!.get('email')!.hasError('email') &&
      (this.registerForm.get('email')!.dirty || this.registerForm.get('email')!.touched || this.isSubmitted)
  }

  hasInvalidPhoneNumber(): boolean{
    return this.registerForm!.get('mobilePhone')!.hasError('pattern') &&
      (this.registerForm.get('mobilePhone')!.dirty || this.registerForm.get('mobilePhone')!.touched || this.isSubmitted)
  }

  hasPasswordMismatch(): boolean{
    const password = this.registerForm!.get('password')!.value;
    const confirmPassword = this.confirmPassword!.value;
    return password !== '' && confirmPassword !== '' && password !== confirmPassword && this.isSubmitted;
  }

}
