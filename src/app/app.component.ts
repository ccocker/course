import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
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
import { IAuthService } from './auth/interfaces/auth-service.interface';
import { AUTH_SERVICE_TOKEN } from './auth/services/auth.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from './auth/store/reducers';

interface AppConfig {
  title: string;
  isRtl: boolean;
  sidenavMenuItems: string[];
  isLoggedIn: boolean;
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
export class AppComponent implements OnInit {
  appConfig: AppConfig = {
    title: 'RMIT COURSE SCHEDULER',
    isRtl: false,
    sidenavMenuItems: ['Dashboard'],
    isLoggedIn: false,
    loggedInItems: ['Logout'],
    loggedOutItems: ['Home', 'About', 'Login'],
    showTopNav: false,
    showLogo: true,
    showAppTitle: false,
  };
  private loginStatusSubscription: Subscription;
  homePageLinks = [
    { title: 'Login/Register', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    {
      title: 'Angular Language Service',
      link: 'https://angular.dev/tools/language-service',
    },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];
  @ViewChild('sidenav') sidenav!: MatSidenav;

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) public authService: IAuthService,
    private dialog: MatDialog,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnInit() {
    this.appConfig.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loginStatusSubscription = this.authService
      .isLoggedIn()
      .subscribe((status) => {
        this.appConfig.isLoggedIn = status;
        this.appConfig.showTopNav = status;
        this.changeDetectorRef.detectChanges();
      });
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
    if (this.appConfig.isLoggedIn && this.sidenav) {
      this.sidenav.toggle();
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '400px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  onItemClick(item: any) {
    if (item === 'Logout') {
      this.authService.logout();
      this.router.navigate(['/']);
    } else if (item.title === 'Login/Register') {
      this.openLoginDialog();
    } else {
      // Handle other items
    }
  }

  trackByTitle(index: number, item: any): string {
    return item.title;
  }
}
