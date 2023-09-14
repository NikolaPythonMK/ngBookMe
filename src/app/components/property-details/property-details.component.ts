import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER } from '@angular/material/datepicker';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import { from } from "rxjs";

@Component({
  selector: 'component-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyDetailsComponent implements OnInit{

  // onDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //   } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
  //     this.toDate = date;
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //   }
  // }

  // isHovered(date: NgbDate) {
  //   return (
  //     this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
  //   );
  // }

  // isInside(date: NgbDate) {
  //   return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  // }

  // isRange(date: NgbDate) {
  //   return (
  //     date.equals(this.fromDate) ||
  //     (this.toDate && date.equals(this.toDate)) ||
  //     this.isInside(date) ||
  //     this.isHovered(date)
  //   );
  // }

  // isUsedRange(date: NgbDate) {
  //   return(
  //     (date.after(this.date1) || date.equals(this.date1)) && (date.before(this.date2) || date.equals(this.date2))
  //   )
  // }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return date >= 14 && date <= 20 ? 'example-custom-date-class' : '';
    }
    return '';
  };

  property!: Property;
  images: string[] = [];
  first: boolean = true;
  activeSlideIndex: number = 0;
  selectedRange: DateRange<Date> | any = null;
  fromDate:  Date | any = null;
  toDate: Date | any = null;

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private location: Location) {
    this.refreshDR();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.propertyService.getById(id).subscribe({
      next: (property) => {
        this.property = property;

        this.images = String(this.property.propertyImages).split(";");
        this.images = this.images.slice(0, this.images.length - 1);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  refreshDR() {
    this.selectedRange = new DateRange(this.fromDate, this.toDate);
  }

  onChange(date: any) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if(this.toDate !== null && this.fromDate !==null){
      this.refreshDR();
    }
  }

  goBack(): void{
    this.location.back();
  }

  isFirst(): boolean{
    if(this.first){
      this.first = false;
      return true;
    }
    return this.first;
  }

  prevSlide(): void{
    if (this.activeSlideIndex > 0) {
      this.activeSlideIndex--;
    }
  }

  nextSlide() {
    if (this.activeSlideIndex < this.images.length - 1) {
      this.activeSlideIndex++;
    }
  }

  onImageClick(pictureNumber: number){
    this.activeSlideIndex = pictureNumber;
  }

  transform(imageName: string, propertyId: number): string {
    console.log('called');
    return `http://192.168.0.15:9090/api/images/${propertyId}/${imageName}`;
  }
}
