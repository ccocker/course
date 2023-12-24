import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as courseScheduleEffects from './store/effects';
import {
  courseScheduleFeatureKey,
  courseScheduleReducer,
} from './store/reducers';
import { CourseScheduleComponent } from './course-schedule.component';

export const routes: Route[] = [
  // { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: CourseScheduleComponent,
    providers: [
      provideEffects(courseScheduleEffects),
      provideState(courseScheduleFeatureKey, courseScheduleReducer),
    ],
  },
];
