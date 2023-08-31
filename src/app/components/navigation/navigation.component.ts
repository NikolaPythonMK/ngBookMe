import {Component, Input, OnInit} from "@angular/core";
import {AuthService} from "../../services/AuthService";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'navigation-app',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  loggedInUser!: any;

  constructor(private authService: AuthService) {}

  logout(): void{
    this.authService.logout();
    this.loggedInUser = null;
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.user;
  }
}
