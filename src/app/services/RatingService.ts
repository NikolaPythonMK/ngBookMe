import {Injectable} from "@angular/core";
import {backendUrl} from "../constants/AppConstants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./AuthService";
import {Observable} from "rxjs";
import {Property} from "../models/Property";
import {RatingRequest} from "../models/RatingRequest";
import {Rating} from "../models/Rating";

@Injectable({
  providedIn: 'root'
})

export class RatingService{
  private readonly url = backendUrl + '/api/rating';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authService.getToken()!,
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  rateProperty(id: number, rating: RatingRequest): Observable<Property>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      })
    }
    return this.http.post<Property>(this.url + "/" + id, rating , httpOptions)
  }
  checkRatingForProperty(id : number) : Observable<Rating>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      })
    }
    return this.http.get<Rating>(this.url + "/check/" + id , httpOptions)
  }
}
