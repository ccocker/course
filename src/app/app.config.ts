import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { AUTH_SERVICE_TOKEN } from '@miCommon/features/auth/services/auth.service';
import { authServiceFactory } from '@miCommon/features/auth/services/auth-factory.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: AUTH_SERVICE_TOKEN, useFactory: authServiceFactory }, // Use the factory here
    // ...other providers as needed
  ],
};
