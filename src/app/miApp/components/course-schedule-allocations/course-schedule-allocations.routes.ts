import { Route } from '@angular/router';

import { CourseScheduleAllocationsComponent } from './course-schedule-allocations.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  tutorPreferencesFeatureKey,
  tutorPreferencesReducer,
} from '../course-schedule/store/tutor-preferences/reducers';
import * as tutorPreferencesEffects from '../course-schedule/store/tutor-preferences/effects';
export const routes: Route[] = [
  {
    path: '',
    component: CourseScheduleAllocationsComponent,
    providers: [
      provideEffects(tutorPreferencesEffects),
      provideState(tutorPreferencesFeatureKey, tutorPreferencesReducer),
    ],
  },
];
