import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./AuthService";
import {map, Observable, tap} from "rxjs";
import {RecentlyViewedPage} from "../models/RecentlyViewedPage";
import { backendUrl } from "../constants/AppConstants";

@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {
  private readonly url = backendUrl + '/api/recently-viewed';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    return this.http.get<any>(this.url, httpOptions)
      .pipe(
        map((page) => {
          return {
            content: page.content,
            pageNumber: page['pageable']['pageNumber'],
            pageSize: page['pageable']['pageSize'],
            totalElements: page['totalElements']
          } as RecentlyViewedPage;
        })
      )
  }

  save(propertyId: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    const url = `${this.url}/${propertyId}`
    return this.http.post<any>(url, {}, httpOptions).pipe(
      tap(data => console.log(data))
    )
  }

  deleteAll(): Observable<boolean>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    return this.http.delete<boolean>(this.url + '/delete-all', httpOptions);
  }

  deleteProperty(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    const url = `${this.url}/delete/${id}`
    return this.http.delete<any>(url, httpOptions);
  }
}
