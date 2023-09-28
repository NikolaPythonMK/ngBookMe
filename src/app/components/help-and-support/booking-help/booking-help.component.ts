import {Component, Input} from "@angular/core";

@Component({
  selector: 'booking-help-app',
  templateUrl: './booking-help.component.html',
  styleUrls: ['./booking-help.component.css']
})
export class BookingHelpComponent {
  @Input() first?: boolean;
  @Input() second?: boolean;
}
