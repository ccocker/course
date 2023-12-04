import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/auth-service.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import { environment } from '../../../environments/environment.development';
import {
  BehaviorSubject,
  combineLatest,
  map,
  switchMap,
  throwError,
} from 'rxjs';

import { Observable, catchError, from, tap } from 'rxjs';
import { IOrganisation } from '../../shared/interfaces/IOrganization';
import { IPerson } from '../../shared/interfaces';
import { Gender } from '../../shared/enums';

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
          return from(this.registerAccount(credentials));
        }
      }),
      catchError((error) => {
        // Constructing a custom error object
        const customError = {
          message: error.message,
          code: error.code,
          // other properties as needed
        };
        return throwError(customError);
      })
    );
  }

  public registerAccount(credentials: any): Observable<any> {
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      switchMap((result) => {
        const user = result.user;
        const db = firebase.firestore();

        // Creating an organization
        const orgRef = this.createOrganization(db, user);

        // Creating a person
        const personRef = this.createPerson(db, user);

        return combineLatest([orgRef, personRef]).pipe(
          map(() => ({
            token: user.refreshToken,
            user: user,
            miId: orgRef['uid'],
          }))
        );
      }),
      tap((result) => {
        this.isAuthenticated.next(true);
        localStorage.setItem('isLoggedIn', 'true');
      }),
      catchError((error) => {
        // Constructing a custom error object
        const customError = {
          message: error.message,
          code: error.code,
          // other properties as needed
        };
        return throwError(customError);
      })
    );
  }

  private createOrganization(
    db: firebase.firestore.Firestore,
    user: firebase.User
  ): Observable<any> {
    // Initially create the organization with an auto-generated UID
    const orgRef = db.collection('organization').doc();
    const defaultOrgData = this.getDefaultOrganizationData(user);

    // First, create the organization with default data
    return from(orgRef.set(defaultOrgData)).pipe(
      switchMap(() => {
        // After the organization is created, update it with its own UID
        const orgIdUpdate = { id: orgRef.id };
        return from(orgRef.update(orgIdUpdate));
      })
    );
  }

  private getDefaultOrganizationData(user: firebase.User): IOrganisation {
    // Omit the 'id' field here, as it will be set after the document is created
    return {
      active: true,
      addresses: [{ label: '', address: '' }],
      phoneNumbers: [{ label: '', country: '', number: '' }],
      emails: [{ label: '', address: '' }],
      dates: [{ label: '', date: new Date() }],
      notes: [''],
      tags: [''],
      name: user.email,
    };
  }

  private createPerson(
    db: firebase.firestore.Firestore,
    user: firebase.User
  ): Observable<any> {
    const personRef = db.collection('people').doc(user.uid);
    const defaultPersonData = this.getDefaultPersonData(user);

    // The { merge: true } option will create or update the record with the default data
    return from(personRef.set(defaultPersonData, { merge: true }));
  }

  private getDefaultPersonData(user: firebase.User): Partial<IPerson> {
    return {
      id: user.uid,
      miId: user.uid,
      firstName: user.displayName,
      lastName: '',
      age: 0,
      avatar: '',
      banner: '',
      active: true,
      addresses: [{ label: '', address: '' }],
      phoneNumbers: [{ label: '', country: '', number: '' }],
      emails: [{ label: '', address: '' }],
      dates: [{ label: 'Created Date', date: new Date() }],
      notes: [''],
      tags: ['user'],
      gender: Gender.PreferNotToSay,
    };
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
