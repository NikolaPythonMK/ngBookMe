import {Component, OnInit, ViewChild} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/AuthService";
import {SavePropertyRequest} from "../../models/SavePropertyRequest";
import {CreatePropertyDialogComponent} from "../create-property-dialog/create-property-dialog.component";

import 'leaflet.locatecontrol';
import {PropertyService} from "../../services/PropertyService";


@Component({
  selector: 'create-component-app',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent {
  constructor(private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              private authService: AuthService,
              private propertyService: PropertyService) {}

  firstFormGroup: FormGroup = this._formBuilder.group({
    propertyName: ['', Validators.required],
    propertyDescription: ['', Validators.required],
    propertySize: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    propertyPrice: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });
  secondFormGroup: FormGroup = this._formBuilder.group({
    propertyCity: ['', Validators.required],
    propertyAddress: ['', Validators.required],
    lon: ['', Validators.required],
    lat: ['', Validators.required]
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({
    propertyType: ['', Validators.required]
  });
  fourthFormGroup: FormGroup = this._formBuilder.group({
    propertyImage: ['', Validators.required],
  })
  imageForm: FormGroup = this._formBuilder.group({
    images: this._formBuilder.array([])
  })

  displayInvalidMessage: boolean = false;
  isSubmitted: boolean = false;
  property?: SavePropertyRequest;

  propertyTypes = ['Apartment', 'Bed and Breakfast (B&B)', 'Boat/Ship', 'Condo', 'Guesthouse', 'Lodge', 'Hostel',
    'Motel', 'Hotel', 'Ranch/Farm Stay', 'Resort', 'Villa']


  onImageChange(event: any) {
    const files = event.target.files;
    const imagesControl = this.imageForm.get('images') as FormArray;

    for (const file of files) {
      imagesControl.push(this._formBuilder.control(file));
    }
  }

  get images() {
    return this.imageForm.get('images') as FormArray;
  }

  openDialog() {
    this.dialog.open(CreatePropertyDialogComponent, {
      data: {
        property: this.property
      },
    }).afterClosed().subscribe(result => {
      if(result.confirmed){
        console.log(this.property)
        console.log(this.images.value)
        this.propertyService.saveProperty(this.property!, this.images.value).subscribe({
          next: value => {
            console.log(value)
          },
          error: err => {
            console.log(err)
          },
          complete: () => {

          }
        })
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
        propertyLocation: this.secondFormGroup.get('lon')!.value + ';' + this.secondFormGroup.get('lat')!.value,
        propertyType: this.thirdFormGroup.get('propertyType')!.value,
        propertySize: this.firstFormGroup.get('propertySize')!.value,
        propertyPrice: this.firstFormGroup.get('propertyPrice')!.value,
        propertyImage: this.fourthFormGroup.get('propertyImage')!.value,
        propertyImages: null,
        propertyUser: this.authService.getToken()
      } as SavePropertyRequest;
      this.openDialog();
    }
    else{
      this.displayInvalidMessage = true;
    }

  }

  allFormsValid(): boolean{
    return this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid;
  }

  onPropertyLocationChange(event: number[]): void{
    this.secondFormGroup.patchValue({
      lon: event[0],
      lat: event[1]
    });
  }
}
