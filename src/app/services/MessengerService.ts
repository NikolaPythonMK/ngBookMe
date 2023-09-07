import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessengerService{
  registration: boolean = false;
  hoveredPropertyId$ = new Subject<number>();

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
