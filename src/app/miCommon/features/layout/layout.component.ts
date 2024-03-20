import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { CommonModule } from '@angular/common'
import { Router, RouterOutlet } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'

import { miAppConfig } from '@miApp/miApp.config'
import { LoginComponent } from '@miCommon/features/auth/components/login/login.component'
import { combineLatest } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectCurrentUser } from '@miCommon/features/auth/store/reducers'
import { authActions } from '@miCommon/features/auth/store/actions'

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
  @ViewChild('sidenav') sidenav!: MatSidenav
  miAppConfig = miAppConfig
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  })

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser())
    this.data$.subscribe(({ currentUser }) => {
      if (
        currentUser &&
        (currentUser.email === 'craig.cocker@gmail.com' ||
          currentUser.email === 'rodney.cocker@gmail.com')
      ) {
        // Keep the original menu items for Craig and Rodney
        this.miAppConfig.sidenavMenuItems = [
          { title: 'Dashboard', link: 'auth/Dashboard' },
          { title: 'Course Schedule', link: 'auth/course-schedule' },
          {
            title: 'Course Schedule Bootcamp',
            link: 'auth/course-schedule-bootcamp',
          },
          {
            title: 'Course Schedule Studio',
            link: 'auth/course-schedule-studio',
          },
          {
            title: 'Course Schedule Allocations',
            link: 'auth/course-schedule-allocations',
          },
          { title: 'Tutor List', link: 'auth/tutor-list' },
          {
            title: 'Course Schedule List',
            link: 'auth/course-schedules',
          },
          { title: 'Courses', link: 'auth/courses' },
          { title: 'Group Classes', link: 'auth/groupclasses' },
          { title: 'Offerings', link: 'auth/offerings' },
          { title: 'Offering Groups', link: 'auth/offeringgroups' },
          { title: 'Tutor Preferences', link: 'auth/tutorpreferences' },
          {
            title: 'People',
            link: 'auth/people',
          },
        ]
      } else if (
        currentUser &&
        (currentUser.email === 'edouard.amouroux4@rmit.edu.au' ||
          currentUser.email === 'julie.porteous@rmit.edu.au')
      ) {
        // Set a different set of menu items specifically for Henry
        this.miAppConfig.sidenavMenuItems = [
          // Define the menu items that Henry should see
          { title: 'Course Schedule', link: 'auth/course-schedule' },
          { title: 'Tutor List', link: 'auth/tutor-list' },
          // Add more menu items as needed
        ]
      } else if (
        (currentUser &&
          (currentUser.email === 'halil.ali@rmit.edu.au' ||
            currentUser.email === 'ryan.kelly@rmit.edu.au' ||
            currentUser.email === 'dana.mckay@rmit.edu.au' ||
            currentUser.email === 'senuri.wijenayake@rmit.edu.au')) ||
        currentUser.email === 'david.eccles@rmit.edu.au' ||
        currentUser.email === 'santha.sumanasekara@rmit.edu.au' ||
        currentUser.email === 'xiuzhen.zhang@rmit.edu.au' ||
        currentUser.email === 'david.leon@gmail.com' ||
        currentUser.email === 'tuck.wah.leong@rmit.edu.au'
      ) {
        // Set a different set of menu items specifically for Henry
        this.miAppConfig.sidenavMenuItems = [
          // Define the menu items that Henry should see
          {
            title: 'Course Schedule Studio',
            link: 'auth/course-schedule-studio',
          },
        ]
      } else {
        // Set a default menu for other users
        this.miAppConfig.sidenavMenuItems = [
          {
            title: 'Bootcamp Timetable',
            link: 'auth/course-schedule-bootcamp',
          },
          {
            title: 'Course Schedule Studio',
            link: 'auth/course-schedule-studio',
          },
        ]
      }
    })
  }

  toggleDirection() {
    this.miAppConfig.isRtl = !this.miAppConfig.isRtl
    const mainContainer = document.getElementById('main-container')
    if (mainContainer) {
      mainContainer.dir = this.miAppConfig.isRtl ? 'rtl' : 'ltr'
    }
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle()
    }
  }

  onItemClick(item: any) {
    if (item === 'Logout') {
      this.store.dispatch(authActions.logout())
    } else {
      this.router.navigate([`/${item['link']}`])
    }
  }
}
