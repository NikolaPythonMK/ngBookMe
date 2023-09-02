import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Property} from "../models/Property";
import {SavePropertyRequest} from "../models/SavePropertyRequest";
import {AuthService} from "./AuthService";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private readonly url = 'http://localhost:9090/api/properties';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}


  saveProperty(formData: FormData): Observable<Property>{
    // Why won't it work with .append()?
    const headers = new HttpHeaders({
      'Authorization': this.authService.getToken()!,
    });
    return this.http.post<Property>(this.url, formData, {headers: headers})
  }
}
