import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ResetPasswordService} from "../../services/ResetPasswordService";
import {AuthService} from "../../services/AuthService";
import {NotificationService} from "../../services/NotificationService";

@Component({
  selector: 'reset-password-app',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  form!: FormGroup;
  hide: boolean = false;
  displayErrorMsg: boolean = false;

  token: string | null = null;

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private resetPasswordService: ResetPasswordService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      newPassword: ['', []],
      confirmNewPassword: ['', []]
    })
    this.token = this.route.snapshot.queryParamMap.get('token');
    if(!this.token){
      this.router.navigate(['']);
    }
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
      this.resetPassword(this.token!, this.form.get('newPassword')!.value);
      this.displayErrorMsg = false;
    }
    else{
      this.displayErrorMsg = true;
    }
  }

  private resetPassword(token: string, password: string): void{
    if(this.token){
      this.resetPasswordService.resetPassword(token!, password).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.notificationService.success("Your password has been changed successfully. You can now log in.");

        },
        error: (err) => {
          this.router.navigate(['/login']);
          this.notificationService.error("There was error with changing your password.");
        }
      });
    }
  }
}
