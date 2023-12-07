import { Routes } from '@angular/router';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Add Home route
  { path: 'course-schedule', component: CourseScheduleComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to Home
];
