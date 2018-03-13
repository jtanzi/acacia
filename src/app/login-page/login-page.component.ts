import { Component, OnInit } from '@angular/core';
import { AF } from "../providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginState: Boolean = false;
  errorState: Boolean = false;

  constructor(public afService: AF, private router: Router) { }

  login() {
    this.afService.login().then((data) => {
      this.loginState = true;
      // Send them to the homepage if they are logged in
      this.router.navigate(['']);
    }).catch( (error) => {
      this.errorState = true;
    });
  }

  ngOnInit() {
  }

}
