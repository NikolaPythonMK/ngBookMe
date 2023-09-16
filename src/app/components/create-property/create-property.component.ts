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

// import * as amenities from '../../../assets/json/amenities.json'


@Component({
  selector: 'create-component-app',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent {

  propertyAmenities = [
    {
      name: 'Air Conditioning (AC)',
      value: 'ac_unit'
    },
    {
      name: 'Heating',
      value: 'light_mode'
    },
    {
      name: 'Free Wi-Fi',
      value: 'wifi'
    },
    {
      name: 'TV',
      value: 'tv'
    },
    {
      name: 'Kitchen',
      value: 'kitchen'
    },
    {
      name: 'Swimming Pool',
      value: 'pool'
    },
    {
      name: 'Hot Tub',
      value: 'hot_tub'
    },
    {
      name: 'Free Parking',
      value: 'local_parking'
    },
    {
      name: 'Gym',
      value: 'fitness_center'
    },
    {
      name: 'Breakfast Included',
      value: 'bakery_dining'
    },
    {
      name: 'Pet-Friendly',
      value: 'pets'
    },
    {
      name: 'Smoking Allowed',
      value: 'smoking_rooms'
    },
    {
      name: 'Wheelchair Accessible',
      value: 'accessible'
    },
    {
      name: 'Laundry Facilities',
      value: 'local_laundry_service'
    },
    {
      name: '24/7 Reception',
      value: 'event_available'
    },
    {
      name: 'On-Site Restaurant',
      value: 'restaurant'
    },
    {
      name: 'Bar/Lounge',
      value: 'local_bar'
    },
    {
      name: 'Spa',
      value: 'spa'
    },
    {
      name: 'Conference Room',
      value: 'videocam'
    },
    {
      name: 'Balcony/Patio',
      value: 'balcony'
    },
    {
      name: 'Ocean View',
      value: 'water'
    },
    {
      name: 'Mountain View',
      value: 'filter_hdr'
    },
    {
      name: 'City View',
      value: 'location_city'
    },
    {
      name: 'Room Service',
      value: 'room_service'
    },
    {
      name: 'Card Entry',
      value: 'room_service'
    },
  ];


  constructor(private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              private authService: AuthService,
              private propertyService: PropertyService,
              private router: Router) {}


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
  fourthFormGroup: FormGroup = this._formBuilder.group({
    // propertyAmenities: ['', Validators.required],
    // propertyAmenities: this._formBuilder.array([])
  })
  imageForm: FormGroup = this._formBuilder.group({
    images: this._formBuilder.array([])
  })

  checkedAmenities: any[] = [];

  displayInvalidMessage: boolean = false;
  isSubmitted: boolean = false;
  property?: SavePropertyRequest;
  dataUrl: string | ArrayBuffer | null = null;
  dataUrls: any[] = [];
  selectedImage: any | null = null;

  uploadedImages: UploadedImage[] = [];

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
          next: value => {
            //TODO: redirect to value.id details
            this.router.navigate(['']);
          },
          error: err => {
            console.log(err);
          },
        })
      }
    })
  }

  submit(): void{
    console.log('4: ', this.checkedAmenities);
    if(this.allFormsValid() && this.selectedImage){
      this.displayInvalidMessage = false;
      this.isSubmitted = true;
      console.log('test: ', this.selectedImage)
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
        propertyUser: this.authService.getToken()
      } as SavePropertyRequest;
      console.log(this.property)

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

      const imagesControl = this.imageForm.get('images') as FormArray;
      for(const image of imagesControl.value){
        console.log(image);
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
    this.checkedAmenities.push({type: type.name, value: type.value})
  }

}
