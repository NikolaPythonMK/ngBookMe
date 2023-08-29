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
    console.log('method call')
    console.log('1: ', this.registration)
    if(this.registration){
      console.log('2: ', this.registration)
      this.registration = false;
      console.log('3: ', this.registration)
      return true;
    }
    console.log('4: ', this.registration)
    return false;
  }
}
