import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MessengerService{
  registration: boolean = false;

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
