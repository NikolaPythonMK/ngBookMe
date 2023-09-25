import {Component, Input} from "@angular/core";
import {Property} from "../../models/Property";
import {ReservationDetail} from "../../models/ReservationDetail";
import {ReservationService} from "../../services/ReservationService";
import {NotificationService} from "../../services/NotificationService";

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
              private notificationService : NotificationService) {}

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

}
