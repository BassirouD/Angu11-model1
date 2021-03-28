import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'catalogueWeb';

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.loadToken();
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  isUser(){
    return this.authService.isUser();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl('/')
  }
}
