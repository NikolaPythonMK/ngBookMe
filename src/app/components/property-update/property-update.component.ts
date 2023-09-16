import {Component, OnInit} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {PropertyUpdate} from "../../models/PropertyUpdate";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'property-update-app',
  templateUrl: './property-update.component.html',
  styleUrls: ['./property-update.component.css']
})
export class PropertyUpdateComponent implements OnInit{
  property!: PropertyUpdate;

  firstFormGroup: FormGroup = this._formBuilder.group({
    propertyName: ['', Validators.required],
    propertyDescription: ['', Validators.required],
    propertySize: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    propertyPrice: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });
  secondFormGroup: FormGroup = this._formBuilder.group({
    propertyCity: ['', Validators.required],
    propertyAddress: ['', Validators.required],
    lat: ['', Validators.required],
    lng: ['', Validators.required]
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({
    propertyType: ['', Validators.required]
  });

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.propertyService.getPropertyUpdate(id).subscribe({
      next: (propertyUpdate) => {
        this.property = propertyUpdate;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goBack(): void{
    console.log('back...')
    this.router.navigate(['/profile/my-properties']);
  }
}
