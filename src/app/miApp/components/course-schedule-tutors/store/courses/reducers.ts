import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CourseScheduleStateInterface } from '../../interfaces/courseScheduleState.interface';
import { coursesActions } from './actions';

const initialState: CourseScheduleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const coursesFeature = createFeature({
  name: 'courses',
  reducer: createReducer(
    initialState,

    on(coursesActions.createCourses, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(coursesActions.createCoursesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: [...state.data, action.courses],
    })),
    on(coursesActions.createCoursesFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })),

    on(coursesActions.getCourse, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(coursesActions.getCourseSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.courses,
    })),
    on(coursesActions.getCourseFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(coursesActions.getCourses, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(coursesActions.getCoursesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.courses,
    })),
    on(coursesActions.getCoursesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: coursesFeatureKey,
  reducer: coursesReducer,
  selectIsLoading,
  selectError,
  selectData: selectEntityData,
} = coursesFeature;

export const selectEntityState = (state: Record<string, any>) =>
  state[coursesFeatureKey];

export const selectCourses = createSelector(
  selectEntityState,
  (state: CourseScheduleStateInterface) => state?.data
);

// Assuming you have a selector to get all entities
export const selectEntityById = createSelector(
  selectCourses,
  (entities, props) => entities.find((entity) => entity.id === props.id)
);
