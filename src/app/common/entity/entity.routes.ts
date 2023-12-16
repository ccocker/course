import { Route } from '@angular/router';
import { EntityComponent } from './entity.component';
import { EntityDetailsComponent } from './components/entity-details/entity-details.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as entityEffects from './store/effects';
import { entityFeatureKey, entityReducer } from './store/reducers';

export const routes: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: EntityComponent,
    providers: [
      provideEffects(entityEffects),
      provideState(entityFeatureKey, entityReducer),
    ],
  },
  { path: 'details/:id', component: EntityDetailsComponent },
];
