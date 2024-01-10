import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as courseScheduleEffects from './store/course-schedules/effects';
import {
  courseScheduleFeatureKey,
  courseScheduleReducer,
} from './store/course-schedules/reducers';
import { CourseScheduleComponent } from './course-schedule.component';
import { coursesFeatureKey, coursesReducer } from './store/courses/reducers';
import * as coursesEffects from './store/courses/effects';
import * as offeringsEffects from './store/offering/effects';
import * as offeringGroupsEffects from './store/offering-groups/effects';
import * as roomsEffects from './store/rooms/effects';
import * as groupClassesEffects from './store/group-classes/effects';
import * as tutorPreferencesEffects from './store/tutor-preferences/effects';
import {
  offeringsFeatureKey,
  offeringsReducer,
} from './store/offering/reducers';
import {
  offeringgroupsFeatureKey,
  offeringgroupsReducer,
} from './store/offering-groups/reducers';
import { roomsFeatureKey, roomsReducer } from './store/rooms/reducers';
import {
  groupClassesFeatureKey,
  groupClassesReducer,
} from './store/group-classes/reducers';
import {
  tutorPreferencesFeatureKey,
  tutorPreferencesReducer,
} from './store/tutor-preferences/reducers';

export const routes: Route[] = [
  // { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: CourseScheduleComponent,
    providers: [
      provideEffects(courseScheduleEffects),
      provideState(courseScheduleFeatureKey, courseScheduleReducer),
      // provideEffects(coursesEffects),
      // provideState(coursesFeatureKey, coursesReducer),
      // provideEffects(offeringGroupsEffects),
      // provideState(offeringgroupsFeatureKey, offeringgroupsReducer),
      // provideEffects(offeringsEffects),
      // provideState(offeringsFeatureKey, offeringsReducer),
      // provideEffects(roomsEffects),
      // provideState(roomsFeatureKey, roomsReducer),
      // provideEffects(groupClassesEffects),
      // provideState(groupClassesFeatureKey, groupClassesReducer),
      provideEffects(tutorPreferencesEffects),
      provideState(tutorPreferencesFeatureKey, tutorPreferencesReducer),
    ],
  },
];
