import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./AuthService";
import {map, Observable, tap} from "rxjs";
import {RecentlyViewed} from "../models/RecentlyViewed";
import {RecentlyViewedPage} from "../models/RecentlyViewedPage";
import {prerenderPages} from "@angular-devkit/build-angular/src/utils/server-rendering/prerender";

@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {
  private readonly url = 'http://localhost:9090/api/recently-viewed';

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
}
