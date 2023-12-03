import { Injectable } from '@angular/core';
import { IAuthService } from './auth-service.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import { environment } from '../environments/environment';
import { BehaviorSubject, map, switchMap, throwError } from 'rxjs';

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

  public login(credentials: any): Observable<any> {
    const checkUserExists = firebase
      .functions()
      .httpsCallable('checkUserExists');

    return from(checkUserExists({ email: credentials.email })).pipe(
      switchMap((result) => {
        if (result.data.exists) {
          // Convert signInWithEmailAndPassword promise to an Observable
          return from(
            this.firebaseAuth.signInWithEmailAndPassword(
              credentials.email,
              credentials.password
            )
          ).pipe(
            tap(() => {
              this.isAuthenticated.next(true);
              localStorage.setItem('isLoggedIn', 'true');
            })
          );
        } else {
          // Create account and convert the promise to an Observable
          return from(this.createAccount(credentials));
        }
      }),
      catchError((error) => {
        // Handle errors
        return throwError(error);
      })
    );
  }

  private createAccount(credentials: any): Observable<any> {
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      switchMap((result) => {
        const user = result.user;
        const db = firebase.firestore();

        // Create a new organization
        const orgRef = db.collection('organization').doc(); // Create a new document
        return from(
          orgRef.set({
            name: user.email, // Use the user's email for organization name
          })
        ).pipe(
          switchMap(() => {
            // Create a user-profile with the user's auth ID and organization ID
            return from(
              db.collection('user-profile').doc(user.uid).set({
                organizationId: orgRef.id,
              })
            );
          }),
          map(() => ({
            token: user.refreshToken,
            user: user,
            organizationId: orgRef.id,
          }))
        );
      }),
      tap((result) => {
        this.isAuthenticated.next(true);
        localStorage.setItem('isLoggedIn', 'true');
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
