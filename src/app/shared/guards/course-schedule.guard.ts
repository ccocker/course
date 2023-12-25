import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../common/services/authorization.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { selectCurrentUser } from '../../common/features/auth/store/reducers';
import { IPermission } from '../../common/interfaces';
import { Person } from '../../common/models';
import { entityActions } from '../../common/features/entity/store/actions';

@Injectable({
  providedIn: 'root',
})
export class CourseScheduleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(selectCurrentUser),
      take(1),
      map((currentUser) => {
        console.log('Current user: ', currentUser);
        if (!currentUser) {
          console.error('No current user found');
          this.router.navigate(['/login']);
          return false;
        }

        const user = currentUser as any; // Cast to Person, if compatible
        const action = route.data.requiredAction as string;
        if (!action) {
          console.error('Required action not defined in route data');
          this.router.navigate(['/error']);
          return false;
        }

        const requiredPermission: IPermission = {
          action: action, // 'view', 'edit', or 'delete'
          scope: 'course-schedule',
        };

        const isAuthorized = this.authService.hasPermission(
          user,
          requiredPermission
        );
        if (!isAuthorized) {
          console.log('User is not authorized to perform this action');
          this.router.navigate(['/unauthorized']);
        }
        return isAuthorized;
      }),
      tap((isAuthorized) => {
        if (!isAuthorized) {
          // Additional logic if necessary when authorization fails
        }
      })
    );
  }
}
