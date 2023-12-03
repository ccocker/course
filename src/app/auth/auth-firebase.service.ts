import { Injectable } from '@angular/core';
import { IAuthService } from './auth-service.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { environment } from '../environments/environment';
import { BehaviorSubject, map, switchMap } from 'rxjs';

import { Observable, catchError, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService implements IAuthService {
  private firebaseAuth: firebase.auth.Auth;
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    this.firebaseAuth = firebase.auth();

    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.isAuthenticated.next(true);
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        // No user is signed in.
        this.isAuthenticated.next(false);
        localStorage.removeItem('isLoggedIn');
      }
    });
  }

  login(credentials: any): Observable<any> {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      tap((result) => {
        this.isAuthenticated.next(true);
        localStorage.setItem('isLoggedIn', 'true');
        return { token: result.user.refreshToken, user: result.user };
      }),
      catchError((error) => {
        return this.createAccount(credentials);
      })
    );
  }

  private createAccount(credentials: any): Observable<any> {
    debugger;
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      tap((result) => {
        this.isAuthenticated.next(true);
        localStorage.setItem('isLoggedIn', 'true');
        return { token: result.user.refreshToken, user: result.user };
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  resetPassword(email: string): Observable<void> {
    return from(this.firebaseAuth.sendPasswordResetEmail(email)).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  logout(): void {
    this.firebaseAuth
      .signOut()
      .then(() => {
        this.isAuthenticated.next(false);
        localStorage.removeItem('isLoggedIn');
      })
      .catch((error) => {
        // Handle logout errors
        // ...
      });
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
