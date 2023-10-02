import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/AuthService";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'layout-app',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent{

  constructor(private authService: AuthService, private router: Router) {}

  shouldShowNavbar(): boolean{
    if(this.router.url.startsWith('/reset-password')){
      return !this.router.url.startsWith('/reset-password');
    }
    return !['/login', '/register'].includes(this.router.url);
  }
}
