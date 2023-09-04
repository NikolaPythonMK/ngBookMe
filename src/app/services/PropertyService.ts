import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {Property} from "../models/Property";
import {SavePropertyRequest} from "../models/SavePropertyRequest";
import {AuthService} from "./AuthService";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private readonly url = 'http://localhost:9090/api/properties';
  // private readonly url = 'http://192.168.1.106:9090/api/properties';

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

  getProperties(urlParams: string | null): Observable<Page>{
    let url;
    if(urlParams){
      url = `${this.url}?page=${urlParams}`;
    }
    else{
      url = this.url;
    }
    return this.http.get<any>(url)
      .pipe(
        map((page) => {
          return {
            content: page.content,
            pageNumber: page['pageable']['pageNumber'],
            pageSize: page['pageable']['pageSize'],
            totalElements: page['totalElements']
          } as Page;
        }
        )
      )
  }

}
