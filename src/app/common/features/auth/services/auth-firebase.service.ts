import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/auth-service.interface';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  Auth,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { environment } from '@environments/environment.development';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  from,
  map,
  throwError,
} from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs';
import { IOrganisation } from '@miShared/interfaces/IOrganization';
import { IPerson } from '@miShared/interfaces';
import { Gender } from '@miCommon/enums';

interface CheckUserExistsResponse {
  exists: boolean;
  // Include other properties that your function might return
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService implements IAuthService {
  private app = initializeApp(environment.firebaseConfig);
  private auth: Auth = getAuth(this.app);
  private db: Firestore = getFirestore(this.app);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  public getCurrentUser(): Observable<any | null> {
    return this.currentUserSubject.asObservable().pipe(
      map((currentUser: User | null) => {
        if (currentUser) {
          const { email, uid, emailVerified, displayName } = currentUser;

          return { email, uid, emailVerified, displayName };
        } else {
          return null;
        }
      })
    );
  }

  public login(credentials: any): Observable<any> {
    const functions = getFunctions(this.app);
    const checkUserExistsFn = httpsCallable(functions, 'checkUserExists');

    return from(checkUserExistsFn({ email: credentials.email })).pipe(
      switchMap((result) => {
        const data = result.data as CheckUserExistsResponse;
        if (data.exists) {
          return from(
            signInWithEmailAndPassword(
              this.auth,
              credentials.email,
              credentials.password
            )
          ).pipe(
            map((response) => response.user) // Extracting the user object
          );
        } else {
          return from(this.registerAccount(credentials)).pipe(
            map((response) => response.user), // Extracting the user object
            tap((user) => {
              console.log('User object:', user); // Logging the user object
            })
          );
        }
      }),
      catchError((error) => {
        // Constructing a custom error object
        const customError = {
          message: error.message,
          code: error.code,
          // other properties as needed
        };
        console.error('Error:', customError); // Logging the error
        return throwError(customError);
      })
    );
  }

  public registerAccount(credentials: any): Observable<any> {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    ).pipe(
      switchMap((result) => {
        const user = result.user;

        // Creating an organization
        const orgRef = this.createOrganization(user);

        // Creating a person
        const personRef = this.createPerson(user);

        return combineLatest([orgRef, personRef]).pipe(
          map(() => ({
            token: user.refreshToken,
            user: user,
            miId: orgRef['uid'],
          }))
        );
      }),

      catchError((error) => throwError(() => new Error(error)))
    );
  }

  private createOrganization(user: User): Observable<any> {
    const orgRef = doc(this.db, 'organization', user.uid);
    const defaultOrgData = this.getDefaultOrganizationData(user);

    return from(setDoc(orgRef, defaultOrgData)).pipe(
      switchMap(() => {
        return from(updateDoc(orgRef, { id: orgRef.id }));
      })
    );
  }

  private getDefaultOrganizationData(user: User): IOrganisation {
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

  private createPerson(user: User): Observable<any> {
    const personRef = doc(this.db, 'people', user.uid);
    const defaultPersonData = this.getDefaultPersonData(user);

    return from(setDoc(personRef, defaultPersonData, { merge: true }));
  }

  private getDefaultPersonData(user: User): Partial<IPerson> {
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
      userDetail: {
        userName: user.displayName || user.email,
        userRole: 'user',
        userEmail: user.email,
      },
    };
  }

  public resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError((error) => throwError(() => new Error(error)))
    );
  }

  public logout(): void {
    this.auth.signOut().catch((error) => {
      // Handle logout errors
      console.error(error);
    });
  }
}
