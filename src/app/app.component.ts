import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AF } from './providers/af';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  public displayName: string;
  public email: string;
  public userId: string;
  public isLoggedIn: boolean;

  // items: FirebaseListObservable<any[]>;
  constructor(private afService: AF,  public afAuth: AngularFireAuth, private router: Router) {
    this.title = 'Acacia';


    this.afService.user.subscribe(
      (auth) => {
        if (auth == null) {
          this.router.navigate(['login']);
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
          this.displayName = auth.displayName;
          this.email = auth.email;
        }
      }
    );

  }

  logout() {
    this.afAuth.auth.signOut();
  }


}
