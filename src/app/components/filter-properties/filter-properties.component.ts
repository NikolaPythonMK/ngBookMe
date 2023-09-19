import {Component} from "@angular/core";

@Component({
  selector: 'filter-app',
  templateUrl: './filter-properties.component.html',
  styleUrls: ['./filter-properties.component.css']
})
export class FilterPropertiesComponent {
  panelOpenState = false;
  selected = 'option2';
}
