import { Route } from '@angular/router';

import { CourseScheduleAllocationsComponent } from './course-schedule-allocations.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as courseScheduleEffects from '../course-schedule/store/course-schedules/effects';

import {
  tutorPreferencesFeatureKey,
  tutorPreferencesReducer,
} from '../course-schedule/store/tutor-preferences/reducers';
import * as tutorPreferencesEffects from '../course-schedule/store/tutor-preferences/effects';
import {
  courseScheduleFeatureKey,
  courseScheduleReducer,
} from '../course-schedule/store/course-schedules/reducers';
export const routes: Route[] = [
  {
    path: '',
    component: CourseScheduleAllocationsComponent,
    providers: [
      provideEffects(courseScheduleEffects),
      provideState(courseScheduleFeatureKey, courseScheduleReducer),
      provideEffects(tutorPreferencesEffects),
      provideState(tutorPreferencesFeatureKey, tutorPreferencesReducer),
    ],
  },
];
