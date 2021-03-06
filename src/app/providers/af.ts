// src/app/providers/af.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AF {
  user: Observable<firebase.User>;
  public displayName: string;
  public email: string;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

 /**
 * Logs in the user
 * @returns {firebase.Promise<FirebaseAuthState>}
 */
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.afAuth.auth.signInWithPopup(provider);
  }

  logout() {
    this.displayName = '';
    this.email = '';
    return this.afAuth.auth.signOut();
  }
}
