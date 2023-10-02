import {Injectable, OnInit} from "@angular/core";
import {backendUrl} from "../constants/AppConstants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService{
  private readonly url = backendUrl + '/api/reset-password';

  constructor(private http: HttpClient) {}


  resetPassword(email: string): Observable<any>{
    return this.http.post(this.url, {email}).pipe(tap(response => console.log("Response: ", response)))
  }
}
