import { Routes } from '@angular/router';
import { ResetPasswordComponent } from '../app/auth/reset-password/reset-password.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';

export const routes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'course-schedule', component: CourseScheduleComponent },
];
