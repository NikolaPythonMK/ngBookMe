import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/AuthService";

@Component({
  selector: 'settings-app',
  templateUrl: '/settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{

  userDetails: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userDetails = this.authService.getUserFromToken(this.authService.getToken()!);
    console.log(this.userDetails);
  }
}
