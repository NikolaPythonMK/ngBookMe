import {Component, ElementRef, HostListener, NgZone, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {PropertyService} from "../../services/PropertyService";
import {Page} from "../../models/Page";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Property} from "../../models/Property";
import {PropertyResponse} from "../../models/PropertyResponse";
import {MessengerService} from "../../services/MessengerService";
import {FilteredData} from "../../models/FilteredData";

@Component({
  selector: 'search-bar-app',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  startDate?: Date;
  endDate?: Date;
  destination: string = '';
  params = new URLSearchParams();
  page!: Page;
  mapEnlarged: boolean = false;
  positionY: number = 0;

  toggleFilter: boolean = false
  type?: string;
  amenities?: string;
  price_range?: any[];

  getFilteredData: boolean = false;
  filteredDataUrl: string = '';
  todayDate:Date = new Date();


  constructor(private propertyService: PropertyService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messengerService: MessengerService) {
  }

  @ViewChildren('mapContainer', {read: ElementRef}) mapContainer!: QueryList<ElementRef>;
  @ViewChildren('searchWrapper', {read: ElementRef}) searchContainer!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.mapContainer.changes.subscribe((elements: QueryList<ElementRef>) => {
      const firstMapContainer = elements.first;
      firstMapContainer.nativeElement.style.top = this.searchContainer.first.nativeElement.clientHeight + "px";
    });
  }

  ngOnInit(): void{
    // this.propertyService.getProperties(null).subscribe({
    //   next: (page) => {
    //     this.page = page;
    //     console.log(this.page.content)
    //     this.messengerService.properties$.next(this.page.content);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.propertyService.getProperties(params.get('page')!, this.filteredDataUrl).subscribe({
        next: page => {
          this.page = page;
          this.messengerService.properties$.next(this.page.content);
          window.scrollTo(0, this.positionY);
        }
      })
    })

    this.messengerService.exitsFromDetails$.subscribe(value => {
      this.positionY = Number(localStorage.getItem('positionY'));
      localStorage.setItem('positionY', '0');
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void{
    localStorage.setItem('positionY', String(window.scrollY));
  }

  appendPageNumberParam(pageNumber: number): void{
    this.router.navigate([], {
      queryParams: {
        'page': pageNumber,
      },
      queryParamsHandling: "merge"
    })
  }

  appendQueryParams(filteredData: FilteredData): void{
    console.log(filteredData);
    let url = '';
    if(this.destination){
      this.params.set('search', this.destination);
      url += `search=${this.destination}&`
    }
    if(this.startDate){
      this.params.set('startDate', this.startDate.toISOString());
      url += `startDate=${this.startDate.toISOString()}&`
    }
    if(this.endDate){
      this.params.set('endDate', this.endDate.toISOString());
      url += `endDate=${this.endDate.toISOString()}`
    }
    if(filteredData.propertyTypes.trim().length > 0){
      this.params.set('propertyTypes', filteredData.propertyTypes);
      url += `&propertyTypes=${filteredData.propertyTypes}`
    }
    if(filteredData.propertyAmenities.trim().length > 0){
      this.params.set('propertyAmenities', filteredData.propertyAmenities);
      url += `&propertyAmenities=${filteredData.propertyAmenities}`
    }
    if(filteredData.propertyRating.trim().length > 0){
      this.params.set('propertyRating', filteredData.propertyRating);
      url += `&propertyRating=${filteredData.propertyRating}`
    }
    if(filteredData.propertyPriceRange.trim().length > 0){
      this.params.set('propertyPriceRange', filteredData.propertyPriceRange);
      url += `&priceRange=${filteredData.propertyPriceRange}`
    }
    console.log(this.params.toString());
    console.log(url);
    this.filteredDataUrl = url;
    this.getFilteredData = false;


    this.propertyService.getProperties(String(this.page.pageNumber), this.filteredDataUrl).subscribe({
      next: page => {
        this.page = page;
        this.messengerService.properties$.next(this.page.content);
        window.scrollTo(0, this.positionY);
      }
    })

    //send data to service: url and the page number
  }


  onEnlarge(event: boolean){
    this.mapEnlarged = event;
  }

  toggleFilterClick(){
    this.toggleFilter = !this.toggleFilter;
    if(this.toggleFilter){
      this.mapContainer.first.nativeElement.style.top = this.searchContainer.first.nativeElement.clientHeight + 106 + "px";
    }else{
      this.mapContainer.first.nativeElement.style.top = this.searchContainer.first.nativeElement.clientHeight - 106 + "px";
    }
  }

  onSubmit(): void{
    this.getFilteredData = true;

  }


}

