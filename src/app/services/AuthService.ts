import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {UserDetails} from "../models/UserDetails";
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../models/RegisterRequest";
import jwt_decode from 'jwt-decode';
import { backendUrl } from "../constants/AppConstants";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private readonly authUrl = backendUrl + '/api/auth';
  private token: string | null = null;

  user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    if(this.isAuthenticated()){
      this.user$.next(this.getUserFromToken(this.getToken()!))
    }
  }

  setToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);
    this.user$.next(this.getUserFromToken(token));
  }

  getToken(): string | null {
    if(!this.token){
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getUserFromToken(token: string): any{
    const decodedToken: any  = jwt_decode(token);
    return JSON.parse(decodedToken.sub);
  }

  isAuthenticated(): boolean{
    const token = this.getToken();
    if (token){
      const decodedToken: any = jwt_decode(token);
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate > new Date();
    }
    return false;
  }


  register(user: RegisterRequest): Observable<UserDetails>{
    return this.http.post<UserDetails>(this.authUrl + '/register', user)
      .pipe(
        tap((userDetails) => console.log("registration: ", userDetails))
      )
  }

  login(email: string, password: string): Observable<string>{
    const credentials = {email, password}
    return this.http.post<string>(this.authUrl + '/login', credentials, {responseType: 'text' as 'json'})
  }

  logout(): void{
    localStorage.removeItem('token');
    this.token = null;
    this.user$.next(null);
  }
}
