import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { authActions } from '../common/features/auth/store/actions';
import { LoginComponent } from '../common/features/auth/components/login/login.component';
import { Router } from '@angular/router';

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
  selector: 'mi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent {
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

  homePageLinks = [
    { title: 'Login/Register', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'courses' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    {
      title: 'Angular Language Service',
      link: 'https://angular.dev/tools/language-service',
    },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];

  constructor(private dialog: MatDialog, private router: Router) {}

  onItemClick(item: any) {
    if (item.title === 'Login/Register') {
      this.openLoginDialog();
    } else {
      this.router.navigate([`/${item['link']}`]);
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '400px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  trackByTitle(index: number, item: any): string {
    return item.title;
  }
}
