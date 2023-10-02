import {Injectable, OnInit} from "@angular/core";
import {backendUrl} from "../constants/AppConstants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {AuthService} from "./AuthService";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService{
  private readonly url = backendUrl + '/api/reset-password';

  constructor(private http: HttpClient,
              private authService: AuthService) {}


  sendResetPasswordRequest(email: string): Observable<any>{
    return this.http.post(this.url + '/email-verification', {email}).pipe(tap(response => console.log("Response: ", response)))
  }

  resetPassword(token: String, password: String): Observable<any>{
    return this.http.post(this.url, {token, password})
  }
}
