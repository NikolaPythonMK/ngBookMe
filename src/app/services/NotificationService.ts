import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private globalConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
  }

  private successConfig: MatSnackBarConfig = {
    panelClass: 'snackbar-success'
  }

  private errorConfig: MatSnackBarConfig = {
    panelClass: 'snackbar-error'
  }

  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void{
    this.snackBar.open(message, 'Close', {
      ...this.globalConfig,
      ...this.successConfig,
    })
  }

  error(message: string): void{
    this.snackBar.open(message, 'Close', {
      ...this.globalConfig,
      ...this.errorConfig
    })
  }
}
