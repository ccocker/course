import { Observable } from 'rxjs';

export interface IAuthService {
  login(credentials: any): Observable<any>;
  logout(): void;
  isLoggedIn(): Observable<boolean>;
}
