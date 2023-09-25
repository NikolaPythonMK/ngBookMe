import {Injectable} from "@angular/core";
import {backendUrl} from "../constants/AppConstants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {AuthService} from "./AuthService";
import {ReservationDetail} from "../models/ReservationDetail";
import {Page} from "../models/Page";
import {ReservationPage} from "../models/ReservationPage";
import {ReservationRequest} from "../models/ReservationRequest";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly url = backendUrl + '/api/reservation';
  constructor(private http: HttpClient, private authService: AuthService){
  }

  getAllForUser(): Observable<any>{
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
            } as ReservationPage;
          }
        ),
      )
  }
  deleteReservation(idToDelete : number) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    console.log(httpOptions);
    return this.http.delete<any>(this.url+ "/" + idToDelete + "/delete", httpOptions)
  }

  postReserve(request: ReservationRequest): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    return this.http.post<any>(this.url + '/add', request, httpOptions)
  }



}
