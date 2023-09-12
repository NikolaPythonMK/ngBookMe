import {Component, OnInit} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'component-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit{

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  readonly date1 = {
    year: 2023,
    month: 10,
    day: 11
  } as NgbDate;

  readonly date2 = {
    year: 2023,
    month: 10,
    day: 15
  } as NgbDate;

  // constructor(calendar: NgbCalendar) {
  //   this.fromDate = calendar.getToday();
  //   this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  // }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  isUsedRange(date: NgbDate) {
    return(
      (date.after(this.date1) || date.equals(this.date1)) && (date.before(this.date2) || date.equals(this.date2))
    )
  }

  test(date: NgbDate): void{

  }

  property!: Property;
  images: string[] = [];
  first: boolean = true;
  activeSlideIndex: number = 0;

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private location: Location,
              private calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

  }

  ngOnInit(): void {

    const date1 = {
      year: 2023,
      month: 10,
      day: 11
    } as NgbDate;

    const date2 = {
      year: 2023,
      month: 10,
      day: 20
    } as NgbDate;

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
