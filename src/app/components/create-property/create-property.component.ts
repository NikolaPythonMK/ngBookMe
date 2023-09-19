import {Component} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/AuthService";
import {SavePropertyRequest} from "../../models/SavePropertyRequest";
import {CreatePropertyDialogComponent} from "../create-property-dialog/create-property-dialog.component";

import 'leaflet.locatecontrol';
import {PropertyService} from "../../services/PropertyService";
import {Router} from "@angular/router";
import {UploadedImage} from "../../models/UploadedImage";
import { propertyTypes } from "src/app/constants/PropertyConstants";
import { propertyAmenities } from "src/app/constants/AmenitiesConstants";
import {NotificationService} from "../../services/NotificationService";
// import * as amenities from '../../../assets/json/amenities.json'


@Component({
  selector: 'create-component-app',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent {
  constructor(private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              private authService: AuthService,
              private propertyService: PropertyService,
              private router: Router,
              private notificationService: NotificationService) {}

  checkedAmenities: any[] = [];
  displayInvalidMessage: boolean = false;
  isSubmitted: boolean = false;
  property?: SavePropertyRequest;
  dataUrl: string | ArrayBuffer | null = null;
  dataUrls: any[] = [];
  selectedImage: any | null = null;
  uploadedImages: UploadedImage[] = [];
  propertyAmenitiesDetails: any[] = [];
  propertyTypes = propertyTypes;
  propertyAmenities = propertyAmenities;

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
  imageForm: FormGroup = this._formBuilder.group({
    images: this._formBuilder.array([])
  })

  renderImages(files: File[]) {
    this.dataUrls = [];
    for (const file of files) {
      const reader = new FileReader(); // dokolku nema poseben reader za sekoja slika, ke se preoptovari

      reader.onload = (event) => {
        const dataUrl = event.target?.result ?? null;
        this.dataUrls.push(dataUrl);

        this.uploadedImages.push({
          file: file,
          url: dataUrl
        } as UploadedImage)

        // Check if all files have been processed
        if (this.dataUrls.length === files.length) {
          // All files have been read, you can do something here if needed
        }


      };

      reader.readAsDataURL(file);
    }
  }

  onThumbnailSubmit(event: any): void{
    const file = event.target.files[0];  // .file - ERROR
    const reader = new FileReader();
    reader.onload = (event) => {
      this.dataUrl = event.target?.result ?? null;
    }
    reader.readAsDataURL(file);
  }

  onImageChange(event: any) {
    const files = event.target.files;
    const imagesControl = this.imageForm.get('images') as FormArray;

    this.renderImages(files);

    for (const file of files) {
      imagesControl.push(this._formBuilder.control(file));
    }
  }

  get images() {
    return this.imageForm.get('images') as FormArray;
  }

  openDialog(formData: FormData) {
    this.dialog.open(CreatePropertyDialogComponent, {
      data: {
        property: this.property
      },
    }).afterClosed().subscribe(result => {
      if(result.confirmed){
        this.propertyService.saveProperty(formData).subscribe({
          next: (property) => {
            this.notificationService.success("Property created successfully!")
            this.router.navigate(['property', property.id]);
          },
          error: err => {
            this.notificationService.error("Property creation failed")
            this.router.navigate([''])
            console.log(err);
          },
        })
      }
    })
  }

  submit(): void{
    if(this.allFormsValid() && this.selectedImage){
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
        propertyImage: this.selectedImage,
        propertyImages: null,
        propertyAmenities: this.checkedAmenities.join(';')
      } as SavePropertyRequest;

      const fd = new FormData();
      fd.append('propertyName', this.firstFormGroup.get('propertyName')!.value);
      fd.append('propertyDescription', this.firstFormGroup.get('propertyDescription')!.value);
      fd.append('propertyCity', this.secondFormGroup.get('propertyCity')!.value);
      fd.append('propertyAddress', this.secondFormGroup.get('propertyAddress')!.value);
      fd.append('propertyLocation', this.secondFormGroup.get('lat')!.value + ';' + this.secondFormGroup.get('lng')!.value);
      fd.append('propertyType', this.thirdFormGroup.get('propertyType')!.value);
      fd.append('propertySize', this.firstFormGroup.get('propertySize')!.value);
      fd.append('propertyPrice', this.firstFormGroup.get('propertyPrice')!.value);
      fd.append('propertyImage', this.selectedImage);
      fd.append('propertyAmenities', this.checkedAmenities.join(';'));

      const imagesControl = this.imageForm.get('images') as FormArray;
      for(const image of imagesControl.value){
        fd.append('images', image);
      }

      this.openDialog(fd);
    }
    else{
      this.displayInvalidMessage = true;
    }
  }

  allFormsValid(): boolean{
    return this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid;
  }

  onPropertyLocationChange(event: number[]): void{
    this.secondFormGroup.patchValue({
      lat: event[0],
      lng: event[1]
    });
  }

  onSelectedImage(file: File):void{
    this.selectedImage = file.name;
  }

  addAmenity(type: any): void{
    console.log(type);
    const index = this.checkedAmenities.indexOf(type.value);
    if (index !== -1) {
      this.checkedAmenities.splice(index, 1);
    } else {
      this.checkedAmenities.push(type.value);
    }
    console.log(this.checkedAmenities);
  }
}
