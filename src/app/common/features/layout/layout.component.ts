import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LoginComponent } from '@miCommon/features/auth/components/login/login.component';
import { combineLatest } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectCurrentUser } from '@miCommon/features/auth/store/reducers';
import { authActions } from '@miCommon/features/auth/store/actions';

interface AppConfig {
  title: string;
  isRtl: boolean;
  sidenavMenuItems: any;
  loggedInItems: string[];
  loggedOutItems: string[];
  showTopNav: boolean;
  showLogo: boolean;
  showAppTitle: boolean;
}

@Component({
  selector: 'mi-layout',
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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  appConfig: AppConfig = {
    title: 'RMIT COURSE SCHEDULER',
    isRtl: false,
    sidenavMenuItems: [
      { title: 'Dashboard', link: '' },
      { title: 'Course Schedule', link: 'auth/course-schedule' },
      { title: 'Courses', link: 'auth/courses' },
      {
        title: 'People',
        link: 'auth/people',
      },
    ],
    loggedInItems: ['Logout'],
    loggedOutItems: ['Home', 'About', 'Login'],
    showTopNav: true,
    showLogo: true,
    showAppTitle: false,
  };

  @ViewChild('sidenav') sidenav!: MatSidenav;

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser());
  }

  toggleDirection() {
    this.appConfig.isRtl = !this.appConfig.isRtl;
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.dir = this.appConfig.isRtl ? 'rtl' : 'ltr';
    }
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  onItemClick(item: any) {
    if (item === 'Logout') {
      this.store.dispatch(authActions.logout());
    } else {
      this.router.navigate([`/${item['link']}`]);
    }
  }
}
