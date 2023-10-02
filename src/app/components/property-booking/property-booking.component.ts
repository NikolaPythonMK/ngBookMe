import {Component, Input} from "@angular/core";
import {Property} from "../../models/Property";
import {ReservationDetail} from "../../models/ReservationDetail";
import {ReservationService} from "../../services/ReservationService";
import {NotificationService} from "../../services/NotificationService";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmComponent} from "../delete-confirm-dialog/delete-confirm.component";
import {RatingDialogComponent} from "../rating-dialog-confirm/rating-dialog.component";
import {RatingService} from "../../services/RatingService";
import {DialogRatingResponse} from "../../models/DialogRatingResponse";
import {RatingRequest} from "../../models/RatingRequest";
import {PropertyService} from "../../services/PropertyService";
import {AuthService} from "../../services/AuthService";
import {Rating} from "../../models/Rating";

@Component({
  selector: 'property-booking-panel',
  templateUrl: './property-booking.component.html',
  styleUrls: ['./property-booking.component.css']
})
export class PropertyBookingComponent {
  @Input() reservation!: ReservationDetail;
  panelOpenState = false;
  todayDate = new Date();
  rating! : Rating;

  constructor(private reservationService : ReservationService,
              private ratingService : RatingService,
              private notificationService : NotificationService,
              public dialog: MatDialog,
              private propertyService : PropertyService,
              public authService : AuthService) {}

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
    this.propertyService.getByIdSmall(propertyId).subscribe({
      next : (property) => {
        const dialogRef = this.dialog.open(RatingDialogComponent, {
          width: '50%',
          height: 'auto',
          data : {
            property: property,
          }
        });

        dialogRef.afterClosed().subscribe((rating: DialogRatingResponse) => {
          if(rating.confirmed){
            const ratingRequest = {
              userRating: rating.rating,
              userComment: rating.comment,
              reservationStartDate: this.reservation.reservationStartDate,
            } as RatingRequest

            this.ratingService.rateProperty(propertyId, ratingRequest).subscribe({
              next: () => {
                this.notificationService.success("Property rated successfully!");
                this.checkRated(this.reservation.id);
              },
              error: (err) => {
                console.log(err);
                this.notificationService.error("Something went wrong...");
              }
            })
          }
        })
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  checkRated(reservationId: number) {
    if(this.panelOpenState){
      this.ratingService.checkRatingForProperty(reservationId).subscribe({
        next : (rating) => {
          this.rating = rating;
        },
        error : (err) => {
          console.log(err);
        }
      });
    }
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
