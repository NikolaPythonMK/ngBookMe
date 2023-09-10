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

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.propertyService.getById(id).subscribe({
      next: (property) => {
        this.property = property;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goBack(): void{
    this.location.back();
  }

}
