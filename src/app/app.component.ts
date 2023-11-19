import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { LoginComponent } from './auth/login/login.component';
import { IAuthService } from './auth/auth-service.interface';
import { AUTH_SERVICE_TOKEN } from './auth/auth.service';
import { Observable } from 'rxjs';

interface AppConfig {
  title: string;
  isRtl: boolean;
  sidenavMenuItems: string[];
  isLoggedIn: boolean;
  loggedInItems: string[];
  loggedOutItems: string[];
  showLogo: boolean;
  showAppTitle: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    LoginComponent,
    CourseScheduleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'henry';
  appConfig: AppConfig = {
    title: 'RMIT COURSE SCHEDULER',
    isRtl: false,
    sidenavMenuItems: ['Dashboard'],
    isLoggedIn: false,
    loggedInItems: ['Logout'],
    loggedOutItems: ['Home', 'About', 'Login'],
    showLogo: true,
    showAppTitle: false,
  };
  isLoggedIn$: Observable<boolean>;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  /**
   * Toggles the text direction between LTR and RTL
   */
  toggleDirection() {
    this.appConfig.isRtl = !this.appConfig.isRtl;
    const mainContainer = document.getElementById('main-container'); // Assuming you have a main container with this ID
    if (mainContainer) {
      mainContainer.dir = this.appConfig.isRtl ? 'rtl' : 'ltr';
    }
  }

  constructor(@Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  subscribeToLoginStatus() {
    this.authService.isLoggedIn().subscribe((status) => {
      this.appConfig.isLoggedIn = status;
    });
  }

  toggleSidenav() {
    if (this.appConfig.isLoggedIn && this.sidenav) {
      this.sidenav.toggle();
    }
  }

  onItemClick(item: string) {
    if (item === 'Logout') {
      this.authService.logout();
    }
    if (item === 'Login') {
      this.appConfig.isLoggedIn = true;
    }
    // Add your logic here based on the clicked menu item
    console.log(`Clicked on menu item: ${item}`);
    // You can navigate to different routes or perform other actions here
  }
}
