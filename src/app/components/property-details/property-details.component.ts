import {Component, OnInit} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'component-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit{

  property!: Property;
  images: string[] = [];
  first: boolean = true;
  activeSlideIndex: number = 0;

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private location: Location) {}

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
