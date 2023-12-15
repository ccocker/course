import { Route } from '@angular/router';
import { ResetPasswordComponent } from './common/auth/components/reset-password/reset-password.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { HomeComponent } from './home/home.component';

export const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  {
    path: 'global-feed',
    loadChildren: () =>
      import('./common/global-feed/global-feed.routes').then((r) => r.routes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./common/your-feed/your-feed.routes').then((r) => r.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('./common/tag-feed/tag-feed.routes').then((m) => m.routes),
  },
  { path: 'course-schedule', component: CourseScheduleComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: ':collection',
    loadChildren: () =>
      import('./common/entity/entity.routes').then((r) => r.routes),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to Home
];
