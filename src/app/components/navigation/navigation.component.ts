import {Component, Input, OnInit} from "@angular/core";
import {AuthService} from "../../services/AuthService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'navigation-app',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  loggedInUser: any | null = null;
  currentPath: string = 'home';

  constructor(private authService: AuthService,
              private router: Router) {}

  logout(): void{
    this.authService.logout();
    this.loggedInUser = null;
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        this.loggedInUser = user;
      }
      else{
        this.loggedInUser = null;
      }
    })
  }
}
