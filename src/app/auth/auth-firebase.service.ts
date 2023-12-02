import { Injectable } from '@angular/core';
import { IAuthService } from './auth-service.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

import { Observable, catchError, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService implements IAuthService {
  private firebaseAuth: firebase.auth.Auth;
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    this.firebaseAuth = firebase.auth();
  }

  login(credentials: any): Observable<any> {
    console.log('login', credentials);
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      tap((result) => {
        // Here you can extract and return the token and user information if needed
        // For example:
        // const token = await result.user.getIdToken();
        // const user = result.user;
        this.isAuthenticated.next(true);
        return { token: 'firebase-token', user: 'FirebaseUser' }; // Replace with actual token and user
      }),
      catchError((error) => {
        // Handle authentication errors
        // ...
        throw error;
      })
    );
  }

  logout(): void {
    this.firebaseAuth
      .signOut()
      .then(() => {
        this.isAuthenticated.next(false);
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
