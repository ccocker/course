import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../interfaces/auth-state.interface';
import { authActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(authActions.rehydrateAuthState, (state, action) => ({
      ...state,
      isLoading: true,
    })),

    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),

    on(routerNavigatedAction, (state) => ({
      ...state,
      validationErrors: null,
    })),

    on(authActions.logout, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.logoutSuccess, (state) => ({
      ...state,
      currentUser: null,
      isLoading: false,
    })),
    on(authActions.logoutFailure, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(authActions.clearCurrentUser, (state) => ({
      ...state,
      currentUser: null,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
