import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthMockService implements IAuthService {
  private isAuthenticated = false;
  private loginStatus = new BehaviorSubject<boolean>(true); // Add this line

  constructor() {
    console.log('AuthMockService instance created');
  }

  login(credentials: any): Observable<any> {
    this.isAuthenticated = true;
    this.loginStatus.next(true); // Update login status
    return of({ token: 'mock-token', user: 'MockUser' });
  }

  resetPassword(email: string): Observable<void> {
    return null;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.loginStatus.next(false); // Update login status
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }
}
