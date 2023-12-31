import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CourseScheduleStateInterface } from '../../interfaces/courseScheduleState.interface';
import { courseScheduleActions } from './actions';

const initialState: CourseScheduleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const courseScheduleFeature = createFeature({
  name: 'courseschedules',
  reducer: createReducer(
    initialState,

    on(courseScheduleActions.createCourseSchedule, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(courseScheduleActions.createCourseScheduleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: [...state.data, action.courseSchedule],
    })),
    on(courseScheduleActions.createCourseScheduleFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })),

    on(courseScheduleActions.createTutorPreferences, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(
      courseScheduleActions.createTutorPreferencesSuccess,
      (state, action) => ({
        ...state,
        isLoading: false,
        data: [...state.data, action.tutorPreferences],
      })
    ),
    on(
      courseScheduleActions.createTutorPreferencesFailure,
      (state, action) => ({
        ...state,
        isLoading: false,
        validationErrors: action.errors,
      })
    ),

    on(courseScheduleActions.getCourseSchedule, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(courseScheduleActions.getCourseScheduleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.courseSchedule,
    })),
    on(courseScheduleActions.getCourseScheduleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(courseScheduleActions.getCourseSchedules, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(courseScheduleActions.getCourseSchedulesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.courseSchedules,
    })),
    on(courseScheduleActions.getCourseSchedulesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: courseScheduleFeatureKey,
  reducer: courseScheduleReducer,
  selectIsLoading,
  selectError,
  selectData: selectEntityData,
} = courseScheduleFeature;

export const selectEntityState = (state: Record<string, any>) =>
  state[courseScheduleFeatureKey];

export const selectEntities = createSelector(
  selectEntityState,
  (state: CourseScheduleStateInterface) => state?.data
);

// Assuming you have a selector to get all entities
export const selectEntityById = createSelector(
  selectEntities,
  (entities, props) => entities.find((entity) => entity.id === props.id)
);
