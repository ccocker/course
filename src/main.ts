import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { Store, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import {
  authFeatureKey,
  authReducer,
} from './app/common/features/auth/store/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/common/features/auth/store/effects';
import * as feedEffects from '@miCommon/components/feed-component/store/effects';
import * as popularTagsEffects from '@miCommon/components/popular-tags/store/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authInterceptor } from './app/shared/services/auth.interceptor';
import {
  feedFeatureKey,
  feedReducer,
} from '@miCommon/components/feed-component/store/reducers';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from '@miCommon/components/popular-tags/store/reducers';
import { PersistanceService } from '@miShared/services/persistance-service';
import { authActions } from './app/common/features/auth/store/actions';

const providers = [
  ...appConfig.providers,
  provideHttpClient(withInterceptors([authInterceptor])),
  provideRouter(routes),
  provideStore({
    router: routerReducer,
  }),
  provideRouterStore(),
  provideState(authFeatureKey, authReducer),
  provideState(feedFeatureKey, feedReducer),
  provideState(popularTagsFeatureKey, popularTagsReducer),
  provideEffects(authEffects, feedEffects, popularTagsEffects),
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
})
  .then((appRef) => {
    // Rehydrate auth state
    const store = appRef.injector.get(Store);
    const persistanceService = appRef.injector.get(PersistanceService);
    const accessToken: any = persistanceService.get('accessToken');
    if (accessToken) {
      store.dispatch(authActions.rehydrateAuthState({ accessToken }));
    }
  })
  .catch((err) => console.error(err));
