import {Component, HostListener} from '@angular/core';
import {PropertyService} from "../../services/PropertyService";
import {Page} from "../../models/Page";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Property} from "../../models/Property";
import {PropertyResponse} from "../../models/PropertyResponse";
import {MessengerService} from "../../services/MessengerService";

@Component({
  selector: 'search-bar-app',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  startDate?: Date;
  ednDate?: string;
  params = new URLSearchParams();
  page!: Page;
  mapEnlarged: boolean = false;
  positionY: number = 0;
  toggleFilter: boolean = false;


  constructor(private propertyService: PropertyService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messengerService: MessengerService) {
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
      this.propertyService.getProperties(params.get('page')!).subscribe({
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

  submit(): void{
    console.log(this.startDate?.toISOString())
  }

  onEnlarge(event: boolean){
    this.mapEnlarged = event;
    console.log(this.mapEnlarged);
  }

  toggleFilterClick(){
    this.toggleFilter = !this.toggleFilter;       
  }
}
