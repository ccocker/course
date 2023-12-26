import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  {
    path: ':collection',
    loadChildren: () =>
      import('./common/features/entity/entity.routes').then((r) => r.routes),
  },
  {
    path: 'auth', // Parent route for all auth-required routes

    children: [
      {
        path: 'course-schedule',
        loadChildren: () =>
          import('./course-schedule/course-schedule.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: ':collection',
        loadChildren: () =>
          import('./common/features/entity/entity.routes').then(
            (r) => r.routes
          ),
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

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to Home
];
