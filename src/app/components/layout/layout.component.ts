import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/AuthService";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'layout-app',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
  user?: any = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.isLoggedIn()){
      const token = this.authService.getToken()!;
      const decodedToken: any  = jwt_decode(token);
      this.user = JSON.parse(decodedToken.sub);
    }
  }

  shouldShowNavbar(): boolean{
    return !['/login', '/register'].includes(this.router.url);
  }

  isLoggedIn(): boolean{
    return this.authService.isAuthenticated();
  }
}
