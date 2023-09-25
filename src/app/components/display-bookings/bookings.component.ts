import {Component} from "@angular/core";
import {ReservationService} from "../../services/ReservationService";
import {ReservationPage} from "../../models/ReservationPage";

@Component({
  selector: 'display-bookings-app',
  templateUrl: './bookings.component.html',
  styleUrls: ['bookings.component.css']
})
export class BookingsComponent {
  reservations!: ReservationPage;
  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getAllForUser().subscribe({
      next: (page) => {
        this.reservations = page;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
