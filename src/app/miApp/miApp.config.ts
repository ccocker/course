interface MiAppConfig {
  title: string
  isRtl: boolean
  sidenavMenuItems: any
  loggedInItems: string[]
  loggedOutItems: string[]
  showTopNav: boolean
  showLogo: boolean
  showAppTitle: boolean
  defaultLandingPages: { [role: string]: string }
}

export const miAppConfig: MiAppConfig = {
  title: 'RMIT COURSE SCHEDULER',
  isRtl: false,
  sidenavMenuItems: [
    { title: 'Dashboard', link: '' },
    { title: 'Course Schedule', link: 'auth/course-schedule' },
    { title: 'Courses', link: 'auth/courses' },
    { title: 'Group Classes', link: 'auth/groupclasses' },
    { title: 'Offerings', link: 'auth/offerings' },
    { title: 'Offering Groups', link: 'auth/offeringgroups' },
    { title: 'Tutor Preferences', link: 'auth/tutorpreferences' },
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
  defaultLandingPages: {
    admin: 'auth/dashboard',
    userAdmin: 'auth/course-schedule',
    user: 'auth/course-schedule-bootcamp',
  },
}
