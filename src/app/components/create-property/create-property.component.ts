import {Component} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
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
  dataUrl: string | ArrayBuffer | null = null;
  dataUrls: any[] = [];

  propertyTypes = [
    {
      name: 'Apartment',
      value: 'APARTMENT',
    },
    {
      name: 'Bed and Breakfast (B&B)',
      value: 'BED_AND_BREAKFAST',
    },
    {
      name: 'Boat/Ship',
      value: 'BOAT_SHIP',
    },
    {
      name: 'Condo',
      value: 'CONDO',
    },
    {
      name: 'Guesthouse',
      value: 'GUESTHOUSE',
    },
    {
      name: 'Lodge',
      value: 'LODGE',
    },
    {
      name: 'Hostel',
      value: 'HOSTEL',
    },
    {
      name: 'Motel',
      value: 'MOTEL',
    },
    {
      name: 'Hotel',
      value: 'HOTEL',
    },
    {
      name: 'Ranch/Farm stay',
      value: 'RANCH_FARM_STAY',
    },
    {
      name: 'Resort',
      value: 'RESORT',
    },
    {
      name: 'Villa',
      value: 'VILLA',
    },
  ];

  renderImages(files: File[]) {
    this.dataUrls = [];
    for (const file of files) {
      const reader = new FileReader(); // dokolku nema poseben reader za sekoja slika, ke se preoptovari

      reader.onload = (event) => {
        const dataUrl = event.target?.result ?? null;
        this.dataUrls.push(dataUrl);

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
        console.log(this.property)
        console.log(this.images.value)
        this.propertyService.saveProperty(formData).subscribe({
          next: value => {
            console.log('value: ', value)
          },
          error: err => {
            console.log('error: ', err)
            console.log('complete: ', formData);
          },
          complete: () => {
            console.log('complete: ', formData);
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

      const fd = new FormData();
      fd.append('propertyName', this.firstFormGroup.get('propertyName')!.value);
      fd.append('propertyDescription', this.firstFormGroup.get('propertyDescription')!.value);
      fd.append('propertyCity', this.secondFormGroup.get('propertyCity')!.value);
      fd.append('propertyAddress', this.secondFormGroup.get('propertyAddress')!.value);
      fd.append('propertyLocation', this.secondFormGroup.get('lon')!.value + ';' + this.secondFormGroup.get('lat')!.value);
      fd.append('propertyType', this.thirdFormGroup.get('propertyType')!.value);
      fd.append('propertySize', this.firstFormGroup.get('propertySize')!.value);
      fd.append('propertyPrice', this.firstFormGroup.get('propertyPrice')!.value);
      fd.append('propertyImage', this.fourthFormGroup.get('propertyImage')!.value);
      fd.append('propertyUser', this.authService.getToken()!);

      const imagesControl = this.imageForm.get('images') as FormArray;
      for(const image of imagesControl.value){
        fd.append('propertyImages', image);
        console.log(image);
      }

      this.openDialog(fd);
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
