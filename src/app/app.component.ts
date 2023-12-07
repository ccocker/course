import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { LoginComponent } from './auth/components/login/login.component';
import { Subscription, combineLatest } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    CourseScheduleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
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
  private loginStatusSubscription: Subscription;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser());
    this.loginStatusSubscription = this.data$.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
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

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '400px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
