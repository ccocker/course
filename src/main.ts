import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/auth/store/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

const providers = [
  ...appConfig.providers,
  provideHttpClient(),
  provideRouter(routes),
  provideStore({
    router: routerReducer,
  }),
  provideRouterStore(),
  provideState(authFeatureKey, authReducer),
  provideEffects(authEffects),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75,
  }),
];

bootstrapApplication(AppComponent, {
  providers: providers,
}).catch((err) => console.error(err));
