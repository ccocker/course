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
  }

  login(credentials: any): Observable<any> {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      switchMap((result) =>
        from(result.user.getIdToken()).pipe(
          map((token) => {
            this.isAuthenticated.next(true);
            localStorage.setItem('isLoggedIn', 'true');
            return { token, user: result.user };
          })
        )
      ),
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
