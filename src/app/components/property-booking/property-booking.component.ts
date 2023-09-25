import {Component, Input} from "@angular/core";
import {Property} from "../../models/Property";
import {ReservationDetail} from "../../models/ReservationDetail";

@Component({
  selector: 'property-booking-panel',
  templateUrl: './property-booking.component.html',
  styleUrls: ['./property-booking.component.css']
})
export class PropertyBookingComponent {
  @Input() reservation!: ReservationDetail;
  panelOpenState = false;
  todayDate = new Date();

  getDateOfReservation(resDate: Date) : Date{
    return new Date(resDate);
  }

}
