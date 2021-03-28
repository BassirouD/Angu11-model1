import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(data){
    this.authService.login(data)
      .subscribe(resp=>{
        //console.log(resp);
        //console.log(resp.headers.get('Authorization'));
        let jwt = resp.headers.get('Authorization');
        this.authService.saveToken(jwt);
        this.router.navigateByUrl('/');
      }, error => {console.log(error)})
  }

}
