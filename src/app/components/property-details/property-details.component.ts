import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER, MatCalendar } from '@angular/material/datepicker';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import { from } from "rxjs";
import { PropertyDetails } from "src/app/models/PropertyDetails";

@Component({
  selector: 'component-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyDetailsComponent implements OnInit{


  property!: PropertyDetails;
  images: string[] = [];
  first: boolean = true;
  activeSlideIndex: number = 0;
  selectedRange: DateRange<Date> | any = null;
  fromDate:  Date | any = null;
  toDate: Date | any = null;
  reservationMap: Map<number, number[]> = new Map();
  @ViewChild("calendar") calendar! : MatCalendar<Date>;

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

        this.setReservationDates();
        this.calendar.updateTodaysDate();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  setReservationDates() : void {
      this.property.reservationList.forEach(i => {
        const resStartDate = new Date(i.reservationStartDate);
        const resEndDate = new Date(i.reservationEndDate);

        if(resStartDate.getMonth() === resEndDate.getMonth()){
          let tempArr = this.reservationMap.get(resStartDate.getMonth());
          if(tempArr === undefined){
            tempArr = [];
          }
          for(let i=resStartDate.getDate(); i<=resEndDate.getDate(); i++){
            tempArr?.push(i);
          }
          console.log(tempArr);
          this.reservationMap.set(resStartDate.getMonth(), tempArr!);
        }
      });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const monthReservations = this.reservationMap.get(cellDate.getMonth());
      return monthReservations?.includes(cellDate.getDate()) ? 'example-custom-date-class' : '';
    }
    return '';
  };

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