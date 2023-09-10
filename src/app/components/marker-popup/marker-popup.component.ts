import {Component, Input} from "@angular/core";
import {PropertyPopup} from "../../models/PropertyPopup";

@Component({
  selector: 'marker-popup-app',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.css']
})
export class MarkerPopupComponent {
  @Input() property!: PropertyPopup;

  ngOnInit(): void{
    console.log(this.property);
  }
}
