import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IAuthService } from './auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthMockService implements IAuthService {
  private isAuthenticated = false;
  private loginStatus = new BehaviorSubject<boolean>(false); // Add this line

  login(credentials: any): Observable<any> {
    this.isAuthenticated = true;
    this.loginStatus.next(true); // Update login status
    return of({ token: 'mock-token', user: 'MockUser' });
  }

  logout(): void {
    this.isAuthenticated = false;
    this.loginStatus.next(false); // Update login status
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }
}
