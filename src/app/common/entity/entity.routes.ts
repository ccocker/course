import { Route } from '@angular/router';
import { EntityComponent } from './entity.component';

export const routes: Route[] = [
  {
    path: ':collection/list',
    component: EntityComponent,
  },
];
