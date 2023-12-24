import { Route } from '@angular/router';
import { ResetPasswordComponent } from './common/features/auth/components/reset-password/reset-password.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { HomeComponent } from './home/home.component';
import { CourseScheduleGuard } from './shared/guards/course-schedule.guard';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  {
    path: 'auth', // Parent route for all auth-required routes
    canActivate: [AuthGuard], // Apply the AuthGuard here
    children: [
      {
        path: 'course-schedule',
        component: CourseScheduleComponent,
        canActivate: [CourseScheduleGuard],
      },
    ],
  },
  {
    path: 'global-feed',
    loadChildren: () =>
      import('./common/features/global-feed/global-feed.routes').then(
        (r) => r.routes
      ),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./common/features/your-feed/your-feed.routes').then(
        (r) => r.routes
      ),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('./common/features/tag-feed/tag-feed.routes').then(
        (m) => m.routes
      ),
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: ':collection',
    loadChildren: () =>
      import('./common/features/entity/entity.routes').then((r) => r.routes),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to Home
];
