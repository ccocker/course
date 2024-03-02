import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CourseScheduleStateInterface } from '../../interfaces/courseScheduleState.interface';
import { offeringgroupsActions } from './actions';

const initialState: CourseScheduleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const offeringgroupsFeature = createFeature({
  name: 'offeringgroups',
  reducer: createReducer(
    initialState,

    on(offeringgroupsActions.createOfferingGroup, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(offeringgroupsActions.createOfferingGroupSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: [...state.data, action.offering],
    })),
    on(offeringgroupsActions.createOfferingGroupFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })),

    on(offeringgroupsActions.getOfferingGroup, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(offeringgroupsActions.getOfferingGroupSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.offeringgroup,
    })),
    on(offeringgroupsActions.getOfferingGroupFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(offeringgroupsActions.getOfferingGroups, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(offeringgroupsActions.getOfferingGroupsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.offeringgroups,
    })),
    on(offeringgroupsActions.getOfferingGroupsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: offeringgroupsFeatureKey,
  reducer: offeringgroupsReducer,
  selectIsLoading,
  selectError,
  selectData: selectEntityData,
} = offeringgroupsFeature;

export const selectEntityState = (state: Record<string, any>) =>
  state[offeringgroupsFeatureKey];

export const selectOfferingGroups = createSelector(
  selectEntityState,
  (state: CourseScheduleStateInterface) => state?.data
);

// Assuming you have a selector to get all entities
export const selectEntityById = createSelector(
  selectOfferingGroups,
  (entities, props) => entities.find((entity) => entity.id === props.id)
);
