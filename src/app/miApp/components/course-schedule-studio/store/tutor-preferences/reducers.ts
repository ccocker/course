import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CourseScheduleStateInterface } from '../../interfaces/courseScheduleState.interface';
import { tutorPreferencesActions } from './actions';

const initialState: CourseScheduleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const tutorPreferencesFeature = createFeature({
  name: 'tutorpreferences',
  reducer: createReducer(
    initialState,

    on(tutorPreferencesActions.createTutorPreferences, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(
      tutorPreferencesActions.createTutorPreferencesSuccess,
      (state, action) => ({
        ...state,
        isLoading: false,
        data: [...state.data, action.tutorPreferences],
      })
    ),
    on(
      tutorPreferencesActions.createTutorPreferencesFailure,
      (state, action) => ({
        ...state,
        isLoading: false,
        validationErrors: action.errors,
      })
    ),

    on(tutorPreferencesActions.getTutorPreferences, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(tutorPreferencesActions.getTutorPreferencesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.tutorpreferences,
    })),
    on(tutorPreferencesActions.getTutorPreferencesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(tutorPreferencesActions.getTutorPreferences, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(tutorPreferencesActions.getTutorPreferencesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.tutorpreferences,
    })),
    on(tutorPreferencesActions.getTutorPreferencesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: tutorPreferencesFeatureKey,
  reducer: tutorPreferencesReducer,
  selectIsLoading,
  selectError,
  selectData: selectEntityData,
} = tutorPreferencesFeature;

export const selectEntityState = (state: Record<string, any>) =>
  state[tutorPreferencesFeatureKey];

export const selectTutorPreferences = createSelector(
  selectEntityState,
  (state: CourseScheduleStateInterface) => state?.data
);

// Assuming you have a selector to get all entities
export const selectEntityById = createSelector(
  selectTutorPreferences,
  (entities, props) => entities.find((entity) => entity.id === props.id)
);
