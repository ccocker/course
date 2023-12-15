import { Route } from '@angular/router';
import { EntityComponent } from './entity.component';
import { EntityDetailsComponent } from './components/entity-details/entity-details.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EntityComponent },
  { path: 'details/:id', component: EntityDetailsComponent },
];
