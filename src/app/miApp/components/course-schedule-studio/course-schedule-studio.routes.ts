import { Route } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'
import * as courseScheduleEffects from './store/course-schedules/effects'
import {
  courseScheduleFeatureKey,
  courseScheduleReducer,
} from './store/course-schedules/reducers'
import { CourseScheduleStudioComponent } from './course-schedule-studio.component'
import * as tutorPreferencesEffects from './store/tutor-preferences/effects'
import {
  tutorPreferencesFeatureKey,
  tutorPreferencesReducer,
} from './store/tutor-preferences/reducers'

export const routes: Route[] = [
  {
    path: '',
    component: CourseScheduleStudioComponent,
    providers: [
      provideEffects(courseScheduleEffects),
      provideState(courseScheduleFeatureKey, courseScheduleReducer),
      provideEffects(tutorPreferencesEffects),
      provideState(tutorPreferencesFeatureKey, tutorPreferencesReducer),
    ],
  },
]
