import {Component, OnInit} from "@angular/core";
import {Property} from "../../models/Property";
import {PropertyService} from "../../services/PropertyService";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {PropertyUpdate} from "../../models/PropertyUpdate";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {propertyTypes} from "../../constants/PropertyConstants";
import {propertyAmenities} from "../../constants/AmenitiesConstants";
import {CreatePropertyDialogComponent} from "../create-property-dialog/create-property-dialog.component";
import {SavePropertyRequest} from "../../models/SavePropertyRequest";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../services/NotificationService";

@Component({
  selector: 'property-update-app',
  templateUrl: './property-update.component.html',
  styleUrls: ['./property-update.component.css']
})
export class PropertyUpdateComponent implements OnInit{
  property!: PropertyUpdate;
  propertyId!: number;
  checkedAmenities: any[] = [];

  latLng: number[] = [];
  displayInvalidMessage: boolean = false;
  isSubmitted: boolean = false;

  readonly propertyTypes = propertyTypes;
  readonly propertyAmenities = propertyAmenities;

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
  fourthFormGroup: FormGroup = this._formBuilder.group({})


  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private _formBuilder: FormBuilder,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.paramMap.get('id'));

    this.propertyService.getPropertyUpdate(this.propertyId).subscribe({
      next: (propertyUpdate) => {
        this.property = propertyUpdate;


        const location = this.property.propertyLocation.split(";");
        this.latLng = [Number(location[0]), Number(location[1])]

        this.firstFormGroup.get('propertyName')!.setValue(this.property.propertyName);
        this.firstFormGroup.get('propertyDescription')!.setValue(this.property.propertyDescription);
        this.firstFormGroup.get('propertySize')!.setValue(this.property.propertySize);
        this.firstFormGroup.get('propertyPrice')!.setValue(this.property.propertyPrice);
        this.secondFormGroup.get('propertyCity')!.setValue(this.property.propertyCity);
        this.secondFormGroup.get('propertyAddress')!.setValue(this.property.propertyAddress);
        this.secondFormGroup.get('lat')!.setValue(this.latLng[0]);
        this.secondFormGroup.get('lng')!.setValue(this.latLng[1]);
        this.thirdFormGroup.get('propertyType')!.setValue(this.property.propertyType);

        this.property.propertyAmenities.split(';').forEach(i => this.checkedAmenities.push(i));
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onPropertyLocationChange(event: number[]): void{
    this.secondFormGroup.patchValue({
      lat: event[0],
      lng: event[1]
    });
  }

  private update(): void{
    this.propertyService.updateProperty(this.propertyId, this.property).subscribe({
      next: () => {
        this.notificationService.success("Property updated successfully!");
        this.router.navigate(['property', this.propertyId])
      },
      error: (err) => {
        this.notificationService.error("Property update failed!");
        console.log(err);
      }
    })
  }

  submit(): void{
    if(this.allFormsValid()){
      this.displayInvalidMessage = false;
      this.isSubmitted = true;
      this.property = {
        propertyName: this.firstFormGroup.get('propertyName')!.value,
        propertyDescription: this.firstFormGroup.get('propertyDescription')!.value,
        propertyCity: this.secondFormGroup.get('propertyCity')!.value,
        propertyAddress: this.secondFormGroup.get('propertyAddress')!.value,
        propertyLocation: this.secondFormGroup.get('lat')!.value + ';' + this.secondFormGroup.get('lng')!.value,
        propertyType: this.thirdFormGroup.get('propertyType')!.value,
        propertySize: this.firstFormGroup.get('propertySize')!.value,
        propertyPrice: this.firstFormGroup.get('propertyPrice')!.value,
        propertyAmenities: this.checkedAmenities.join(';')
      } as PropertyUpdate;

      this.update();
    }
    else{
      this.displayInvalidMessage = true;
    }
  }

  allFormsValid(): boolean{
    return this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid;
  }

  addAmenity(type: any): void{
    console.log(type);
    const index = this.checkedAmenities.indexOf(type.value);
    if (index !== -1) {
      this.checkedAmenities.splice(index, 1);
    } else {
      this.checkedAmenities.push(type.value);
    }
  }

  goBack(): void{
    this.router.navigate(['/profile/my-properties']);
  }
}
