import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from '../../common/features/auth/store/reducers'; // Adjust path as necessary

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectCurrentUser),
      take(1),
      map((currentUser) => {
        if (!currentUser) {
          console.log('Access denied. Redirecting to home page...');
          this.router.navigate(['/home']);
          return false;
        }
        console.log('User is authenticated, allow access:', currentUser);

        return true;
      })
    );
  }
}
