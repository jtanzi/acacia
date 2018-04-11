import { Component, OnInit } from '@angular/core';
import { AF } from '../providers/af';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isLoggedIn: Boolean = false;
  errorState: Boolean = false;

  constructor(public afService: AF, public afAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string): void {
    const loginResult = this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password');
          // TODO - pass message to HTML
        } else {
          alert(errorMessage);
        }
      });
    loginResult.then( () => {
      this.isLoggedIn = true;
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
