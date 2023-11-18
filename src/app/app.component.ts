import { Component, Input, ViewChild } from '@angular/core';
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
    isLoggedIn: true,
    loggedInItems: ['Logout'],
    loggedOutItems: ['Home', 'About', 'Login'],
    showLogo: true,
    showAppTitle: false,
  };
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
  toggleSidenav() {
    if (this.appConfig.isLoggedIn && this.sidenav) {
      this.sidenav.toggle();
    }
  }

  onItemClick(item: string) {
    if (item === 'Logout') {
      this.appConfig.isLoggedIn = false;
    }
    if (item === 'Login') {
      this.appConfig.isLoggedIn = true;
    }
    // Add your logic here based on the clicked menu item
    console.log(`Clicked on menu item: ${item}`);
    // You can navigate to different routes or perform other actions here
  }
}
