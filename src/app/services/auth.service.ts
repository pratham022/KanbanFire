import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../interfaces/user';
import { Subject, Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { messages } from '../messages';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userState: any;

  // Step 1: define the subject
  subject = new Subject<string>();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private snackBarService: SnackbarService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        this.subject.next("User logged in");    // Step 2: Add to the subject: stream of values
      } else {
        localStorage.setItem('user', '');
      }
    })
  }

  getSubjectVal(): Observable<string> {       // Step 3: called by sign-in component
    return this.subject.asObservable();
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
        this.snackBarService.openSnackBar(messages.loginSuccess, "Dismiss", messages.success);
      }).catch((error) => {
        window.alert(error.message)
        this.snackBarService.openSnackBar(messages.loginFailure, "Dismiss", messages.failure);
      })
  }


  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.snackBarService.openSnackBar(messages.registerSuccess, "Dismiss", messages.success);
      }).catch((error) => {
        window.alert(error.message)
        this.snackBarService.openSnackBar(messages.registerFailure, "Dismiss", messages.failure);
      })
  }



  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  get isLoggedIn(): boolean {
    
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user') || '')
    } catch(e) {
      user = null;
    }
    if(user === '') user = null;
    return (user !== null) ? true : false;
  }

  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    return userRef.set(userState, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
      this.snackBarService.openSnackBar(messages.loggedOut, "Dismiss", messages.success);
    })
  } 

}