import {Component, Input} from "@angular/core";
import {Property} from "../../models/Property";
import {ReservationDetail} from "../../models/ReservationDetail";
import {ReservationService} from "../../services/ReservationService";
import {NotificationService} from "../../services/NotificationService";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmComponent} from "../delete-confirm-dialog/delete-confirm.component";
import {RatingDialogComponent} from "../rating-dialog-confirm/rating-dialog.component";
import {RatingService} from "../../services/RatingService";

@Component({
  selector: 'property-booking-panel',
  templateUrl: './property-booking.component.html',
  styleUrls: ['./property-booking.component.css']
})
export class PropertyBookingComponent {
  @Input() reservation!: ReservationDetail;
  panelOpenState = false;
  todayDate = new Date();

  constructor(private reservationService : ReservationService,
              private ratingService : RatingService,
              private notificationService : NotificationService,
              public dialog: MatDialog,) {}

  getDateOfReservation(resDate: Date) : Date{
    return new Date(resDate);
  }

  deleteReservation(deleteId : number) : void {
    this.reservationService.deleteReservation(deleteId).subscribe({
      next: () => {
        this.notificationService.success("Reservation deleted successfully")
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  rateProperty(propertyId : number) : void {
    const dialogRef = this.dialog.open(RatingDialogComponent)

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed){
        this.ratingService.rateProperty(propertyId).subscribe({
          next: () => {
            this.openSnackBar();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  openSnackBar(): void{
    this.notificationService.success('Property rated successfully!');
  }

}
