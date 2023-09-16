import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {Property} from "../models/Property";

@Injectable({
  providedIn: 'root'
})
export class MessengerService{
  registration: boolean = false;
  hoveredPropertyId$ = new Subject<{id: number, toOpen: boolean}>();
  properties$ = new BehaviorSubject<Property[]>([]);

  accountRegistered(): void{
    this.registration = true;
  }

  isRegistered(): boolean{
    if(this.registration){
      this.registration = false;
      return true;
    }
    return false;
  }
}
