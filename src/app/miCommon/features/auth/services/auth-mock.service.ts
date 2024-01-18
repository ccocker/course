import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthMockService implements IAuthService {
  private loginStatus = new BehaviorSubject<boolean>(true); // Add this line

  constructor() {}

  public checkIfUserExists(email: string): Promise<boolean> {
    console.log('Mock Authentication Service');
    return Promise.resolve(true);
  }

  login(credentials: any): Observable<any> {
    this.loginStatus.next(true); // Update login status
    return of({ token: 'mock-token', user: 'MockUser' });
  }

  getCurrentUser(): Observable<any> {
    return null;
  }

  validateToken(token: string): Observable<boolean> {
    const isValid = token && typeof token === 'string' && token.length > 0;
    return of(isValid);
  }

  registerAccount(credentials: any): Observable<any> {
    return null;
  }

  resetPassword(email: string): Observable<void> {
    return null;
  }

  logout(): void {
    this.loginStatus.next(false); // Update login status
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }
}
