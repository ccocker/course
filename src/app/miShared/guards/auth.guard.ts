import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from '@miCommon/features/auth/store/reducers';
import { PersistanceService } from '@miShared/services/persistance-service';
import { authActions } from '@miCommon/features/auth/store/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store,
    private persistenceService: PersistanceService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser) => currentUser !== undefined),
      take(1),
      map((currentUser) => {
        console.log('Auth Guard currentUser', currentUser);
        if (!currentUser) {
          // Redirect if no user is present
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
