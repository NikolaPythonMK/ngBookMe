import {Component, OnInit} from "@angular/core";
import {MessengerService} from "../../services/MessengerService";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/AuthService";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode';
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ResetPasswordDialogComponent} from "../reset-password-dialog/reset-password-dialog.component";
import {ResetPasswordService} from "../../services/ResetPasswordService";
import {NotificationService} from "../../services/NotificationService";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {ResetPasswordDialogResponse} from "../../models/ResetPasswordDialogResponse";

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../../shared-styles/auth.css']
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isSubmitted: boolean = false;
  hide: boolean = true;
  displayRegistrationMessage: boolean = false;
  displayErrorMessage: boolean = false;

  constructor(private messengerService: MessengerService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private location: Location,
              private dialog: MatDialog,
              private resetPasswordService: ResetPasswordService,
              private notificationService: NotificationService) {}


  ngOnInit(): void {
    this.displayRegistrationMessage = this.messengerService.isRegistered();
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.loginForm.valid){
      const email = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      this.authService.login(email!, password!).subscribe({
        next: (token) => {
          this.authService.setToken(token);
          this.router.navigate([''])
          // this.location.back();
        },
        error: (err) => {
          this.displayErrorMessage = true;
          console.log(err)
        }
      })
    }
  }

  isValid(control: string): boolean {
    return this.loginForm.get(control)!.invalid &&
      (this.loginForm.get(control)!.dirty || this.loginForm.get(control)!.touched || this.isSubmitted);
  }

  hasRequiredError(control: string): boolean{
    // console.log(this.loginForm!.get().errors)
    return this.loginForm!.get(control)!.hasError('required') &&
      (this.loginForm.get(control)!.dirty || this.loginForm.get(control)!.touched || this.isSubmitted);
  }

  hasInvalidUsername(control: string): boolean{
    return this.loginForm!.get(control)!.hasError('email') &&
      (this.loginForm.get(control)!.dirty || this.loginForm.get(control)!.touched || this.isSubmitted);
  }

  openResetPasswordDialog(): void{
    this.dialog.open(ResetPasswordDialogComponent).afterClosed().subscribe((dialogResponse: ResetPasswordDialogResponse) => {
      if(dialogResponse && dialogResponse.isValid){
        this.resetPassword(dialogResponse.value!);
      }
      else if(dialogResponse && !dialogResponse.isValid){
        this.notificationService.error("The email that you entered is invalid.")
      }
    })
  }

  resetPassword(value: string): void{
    this.resetPasswordService.sendResetPasswordRequest(value).subscribe({
      next: () => {
        this.notificationService.success("A request to reset your password has been sent. Please check your email.");
      },
      error: (err) => {
        console.log(err);
        this.notificationService.error("Please make sure the email is valid.");
      }
    })
  }
}
