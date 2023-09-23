import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {Property} from "../models/Property";
import {AuthService} from "./AuthService";
import {Page} from "../models/Page";
import { PropertyDetails } from "../models/PropertyDetails";
import {PropertyUpdate} from "../models/PropertyUpdate";
import { backendUrl } from "../constants/AppConstants";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private readonly url = backendUrl + '/api/properties';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authService.getToken()!,
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}


  saveProperty(formData: FormData): Observable<Property>{
    // Why won't it work with .append()?
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      })
    }
    console.log(httpOptions);
    return this.http.post<Property>(this.url, formData, httpOptions)
  }

  getProperties(urlParams: string | null, filteredData?: string): Observable<Page>{
    let url = '';
    let opts = {};

    if(urlParams){
      url = `${this.url}?page=${urlParams}`;
    }
    else{
      url = this.url;
    }

    if(filteredData){
      url += `&${filteredData}`
    }

    if(this.authService.isAuthenticated()){
      opts = {
        headers: new HttpHeaders({
          'Authorization': this.authService.getToken()!,
        }),
      };
    }

    return this.http.get<any>(url, opts)
      .pipe(
        map((page) => {
          return {
            content: page.content,
            pageNumber: page['pageable']['pageNumber'],
            pageSize: page['pageable']['pageSize'],
            totalElements: page['totalElements']
          } as Page;
        }
        ),
      )
  }

  getById(id: number): Observable<PropertyDetails>{
    const url = `${this.url}/${id}`
    return this.http.get<PropertyDetails>(url);
  }

  bookmarkProperty(id: number): Observable<Property>{
    const url = `${this.url}/${id}/favourite`;
    return this.http.post<Property>(url, {}, this.httpOptions);
  }

  removeBookmark(id: number): Observable<any>{
    const url = `${this.url}/${id}/favourite/delete`;
    return this.http.post<any>(url, {}, this.httpOptions);
  }

  getBookmarkedProperties(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    return this.http.get<any>(this.url + '/favourites', httpOptions)
      .pipe(
        map(page => {
          return {
            content: page.content,
            pageNumber: page['pageable']['pageNumber'],
            pageSize: page['pageable']['pageSize'],
            totalElements: page['totalElements']
          } as Page;
        }),
      );
  }

  getPropertiesForUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    return this.http.get<any>(this.url + '/user', httpOptions)
      .pipe(
        tap(data => console.log(data)),
        map((page) => {
          return {
            content: page.content,
            pageNumber: page['pageable']['pageNumber'],
            pageSize: page['pageable']['pageSize'],
            totalElements: page['totalElements']
          } as Page;
        })
      )
  }

  deleteProperty(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    const url = `${this.url}/${id}/delete`;
    return this.http.delete<any>(url, httpOptions)
  }

  getPropertyUpdate(id: number): Observable<PropertyUpdate>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    const url = `${this.url}/${id}/edit`
    return this.http.get<PropertyUpdate>(url, httpOptions);
  }

  updateProperty(id: number, property: PropertyUpdate): Observable<Property>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    const url = `${this.url}/${id}/edit`
    return this.http.put<Property>(url, property, httpOptions);
  }


}
