import {Injectable} from "@angular/core";
import {backendUrl} from "../constants/AppConstants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./AuthService";
import {Observable} from "rxjs";
import {Property} from "../models/Property";

@Injectable({
  providedIn: 'root'
})

export class RatingService{
  private readonly url = backendUrl + '/rating';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authService.getToken()!,
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  rateProperty(id: number): Observable<Property>{
    // Why won't it work with .append()?
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      })
    }
    return this.http.post<Property>(this.url + "/" + id, {} , httpOptions)
  }
}
