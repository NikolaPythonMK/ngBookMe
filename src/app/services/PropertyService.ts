import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Property} from "../models/Property";
import {SavePropertyRequest} from "../models/SavePropertyRequest";

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

  constructor(private http: HttpClient) {}


  saveProperty(obj: SavePropertyRequest, files: any[]): Observable<Property>{
    return this.http.post<Property>(this.url, {data: obj, images: []})
  }

}
