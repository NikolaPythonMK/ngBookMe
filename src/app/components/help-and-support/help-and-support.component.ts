import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'help-and-support-app',
  templateUrl: './help-and-support.component.html',
  styleUrls: ['/help-and-support.component.css']
})
export class HelpAndSupportComponent implements OnInit{

  constructor(private authService: AuthService,
              private router: Router) {}

  private _user?: any;

  selected: number = 7;

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this._user = user;
      console.log(this._user)
    })
  }

  get user(): any{
    return this._user;
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['login'])
  }

}
