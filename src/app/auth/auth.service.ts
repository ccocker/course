import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable, InjectionToken } from '@angular/core';
import { IAuthService } from './auth-service.interface';

export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>(
  'AUTH_SERVICE_TOKEN'
);

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private loginStatus = new BehaviorSubject<boolean>(false);

  login(credentials: any): Observable<any> {
    // ... login logic
    this.loginStatus.next(true); // Emit true on successful login
    return of({ token: 'auth-token' });
  }

  logout(): void {
    // ... logout logic
    this.loginStatus.next(false); // Emit false on logout
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }
}