import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CourseScheduleStateInterface } from '../../interfaces/courseScheduleState.interface';
import { groupClassesActions } from './actions';

const initialState: CourseScheduleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const groupClassesFeature = createFeature({
  name: 'groupclasses',
  reducer: createReducer(
    initialState,

    on(groupClassesActions.createGroupClass, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(groupClassesActions.createGroupClassSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: [...state.data, action.groupclass],
    })),
    on(groupClassesActions.createGroupClassFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })),

    on(groupClassesActions.getGroupClass, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(groupClassesActions.getGroupClassSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.groupclasses,
    })),
    on(groupClassesActions.getGroupClassFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(groupClassesActions.getGroupClasses, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(groupClassesActions.getGroupClassesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.groupclasses,
    })),
    on(groupClassesActions.getGroupClassesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: groupClassesFeatureKey,
  reducer: groupClassesReducer,
  selectIsLoading,
  selectError,
  selectData: selectEntityData,
} = groupClassesFeature;

export const selectEntityState = (state: Record<string, any>) =>
  state[groupClassesFeatureKey];

export const selectGroupClasss = createSelector(
  selectEntityState,
  (state: CourseScheduleStateInterface) => state?.data
);

// Assuming you have a selector to get all entities
export const selectEntityById = createSelector(
  selectGroupClasss,
  (entities, props) => entities.find((entity) => entity.id === props.id)
);
