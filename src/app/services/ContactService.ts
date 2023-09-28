import {Injectable} from "@angular/core";
import {backendUrl} from "../constants/AppConstants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./AuthService";
import {SendHelpMessage} from "../models/SendHelpMessage";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly url = backendUrl + '/api/help';

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  send(data: SendHelpMessage): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getToken()!,
      }),
    };
    return this.http.post<any>(this.url, data, httpOptions);
  }
}
