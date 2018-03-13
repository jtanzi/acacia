import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AF } from "./providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn: boolean;
  public title: string;
  public displayName: string;
  public email: string;
  public userId: string;

  // items: FirebaseListObservable<any[]>;
  constructor(public afService: AF, private router: Router, db: AngularFireDatabase) {
    this.title = 'Acacia';
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.

    this.afService.user.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          this.router.navigate(['login']);
          this.isLoggedIn = false;
        }
        else {
          console.log("Successfully Logged in.");
          this.isLoggedIn = true;
          this.displayName = auth.displayName;
          this.email = auth.email;
          // this.router.navigate(['']);
        }
      }
    );

  }

  logout() {
    this.afService.logout();
  }
}
