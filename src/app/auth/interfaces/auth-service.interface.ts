import { Observable } from 'rxjs';

export interface IAuthService {
  login(credentials: any): Observable<any>;
  registerAccount(credentials: any): Observable<any>;
  resetPassword(email: string): Observable<void>;
  getCurrentUser(): Observable<any>;
  logout(): void;
}
