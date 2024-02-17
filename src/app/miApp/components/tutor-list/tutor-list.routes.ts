import { Route } from '@angular/router';

import { TutorListComponent } from './tutor-list.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as courseScheduleEffects from '../course-schedule/store/course-schedules/effects';
import * as peopleEffects from '@miCommon/features/entity/store/effects';
import {
  tutorPreferencesFeatureKey,
  tutorPreferencesReducer,
} from '../course-schedule/store/tutor-preferences/reducers';
import * as tutorPreferencesEffects from '../course-schedule/store/tutor-preferences/effects';
import {
  courseScheduleFeatureKey,
  courseScheduleReducer,
} from '../course-schedule/store/course-schedules/reducers';
import {
  entityFeatureKey,
  entityReducer,
} from '@miCommon/features/entity/store/reducers';
export const routes: Route[] = [
  {
    path: '',
    component: TutorListComponent,
    providers: [
      provideEffects(peopleEffects),
      provideState(entityFeatureKey, entityReducer),
      provideEffects(courseScheduleEffects),
      provideState(courseScheduleFeatureKey, courseScheduleReducer),
      provideEffects(tutorPreferencesEffects),
      provideState(tutorPreferencesFeatureKey, tutorPreferencesReducer),
    ],
  },
];
