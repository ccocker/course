import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { AUTH_SERVICE_TOKEN, AuthService } from './auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService }, // Add this line
    // ...you can add other providers as needed
  ],
};
