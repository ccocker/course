import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LoginComponent } from './auth/components/login/login.component';
import { combineLatest } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectCurrentUser } from './auth/store/reducers';
import { authActions } from './auth/store/actions';

interface AppConfig {
  title: string;
  isRtl: boolean;
  sidenavMenuItems: string[];
  loggedInItems: string[];
  loggedOutItems: string[];
  showTopNav: boolean;
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  appConfig: AppConfig = {
    title: 'RMIT COURSE SCHEDULER',
    isRtl: false,
    sidenavMenuItems: ['Dashboard'],
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

  constructor(private store: Store) {}

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
    console.log('Clicked Item', item);
    if (item === 'Logout') {
      this.store.dispatch(authActions.logout());
    }
  }
}
