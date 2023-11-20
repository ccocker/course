import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IAuthService } from './auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService implements IAuthService {
  private isAuthenticated = false;
  private loginStatus = new BehaviorSubject<boolean>(true); // Add this line

  constructor() {
    console.log('AuthFirebaseService instance created');
  }

  login(credentials: any): Observable<any> {
    this.isAuthenticated = true;
    this.loginStatus.next(true); // Update login status
    return of({ token: 'firebase-token', user: 'FirebaseUser' });
  }

  logout(): void {
    this.isAuthenticated = false;
    this.loginStatus.next(false); // Update login status
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }
}
