import { Route } from '@angular/router';
import { EntityDetailsComponent } from './components/entity-details/entity-details.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as entityEffects from './store/effects';
import { entityFeatureKey, entityReducer } from './store/reducers';
import { EntityListComponent } from './components/entity-list/entity-list.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: EntityListComponent,
    providers: [
      provideEffects(entityEffects),
      provideState(entityFeatureKey, entityReducer),
    ],
  },
  {
    path: 'details/:id',
    component: EntityDetailsComponent,
    providers: [
      provideEffects(entityEffects),
      provideState(entityFeatureKey, entityReducer),
    ],
  },
];
