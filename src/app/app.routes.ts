import { Route } from '@angular/router';
import { ResetPasswordComponent } from '@miCommon/features/auth/components/reset-password/reset-password.component';
import { HomeComponent } from '@miApp/components/home/home.component';
import { LayoutComponent } from '@miCommon/features/layout/layout.component';
import { AuthGuard } from '@miShared/guards/auth.guard';
import { DashboardComponent } from '@miApp/components/dashboard/dashboard.component';
export const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  {
    path: 'auth', // Parent route for all auth-required routes
    component: LayoutComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard here
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'course-schedule',
        loadChildren: () =>
          import(
            '@miApp/components/course-schedule/course-schedule.routes'
          ).then((r) => r.routes),
      },
      {
        path: 'course-schedule-tutors',
        loadChildren: () =>
          import(
            '@miApp/components/course-schedule-tutors/course-schedule-tutors.routes'
          ).then((r) => r.routes),
      },
      {
        path: 'course-schedule-allocations',
        loadChildren: () =>
          import(
            '@miApp/components/course-schedule-allocations/course-schedule-allocations.routes'
          ).then((r) => r.routes),
      },
      {
        path: 'tutor-list',
        loadChildren: () =>
          import('@miApp/components/tutor-list/tutor-list.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: ':collection',
        loadChildren: () =>
          import('@miCommon/features/entity/entity.routes').then(
            (r) => r.routes
          ),
      },
    ],
  },
  {
    path: 'global-feed',
    loadChildren: () =>
      import('@miCommon/features/global-feed/global-feed.routes').then(
        (r) => r.routes
      ),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('@miCommon/features/your-feed/your-feed.routes').then(
        (r) => r.routes
      ),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('@miCommon/features/tag-feed/tag-feed.routes').then(
        (m) => m.routes
      ),
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to Home
];
