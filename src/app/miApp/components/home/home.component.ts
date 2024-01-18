import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { miAppConfig } from '@miApp/miApp.config';
import { LoginComponent } from '@miCommon/features/auth/components/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'mi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent {
  miAppConfig = miAppConfig;
  homePageLinks = [
    { title: 'Login/Register', link: 'https://angular.dev' },
    // { title: 'Learn with Tutorials', link: 'courses' },
    // { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    // {
    //   title: 'Angular Language Service',
    //   link: 'https://angular.dev/tools/language-service',
    // },
    // { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
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
