import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {Property} from "../models/Property";
import {SavePropertyRequest} from "../models/SavePropertyRequest";
import {AuthService} from "./AuthService";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private readonly url = 'http://localhost:9090/api/properties';
  // private readonly url = 'http://192.168.1.106:9090/api/properties';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authService.getToken()!,
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}


  saveProperty(formData: FormData): Observable<Property>{
    // Why won't it work with .append()?
    // const headers = new HttpHeaders({
    //   'Authorization': this.authService.getToken()!,
    // });
    return this.http.post<Property>(this.url, formData, this.httpOptions)
  }

  getProperties(urlParams: string | null): Observable<Page>{
    let url;
    let opts = {};

    if(urlParams){
      url = `${this.url}?page=${urlParams}`;
    }
    else{
      url = this.url;
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

  bookmarkProperty(id: number): Observable<Property>{
    const url = `${this.url}/${id}/favourite`;
    return this.http.post<Property>(url, {}, this.httpOptions);
  }

  removeBookmark(id: number): Observable<any>{
    const url = `${this.url}/${id}/favourite/delete`;
    return this.http.post<any>(url, {}, this.httpOptions);
  }

  getBookmarkedProperties(): Observable<any>{
    return this.http.get<any>(this.url + '/favorites', this.httpOptions)
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

}
