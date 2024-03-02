import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CourseScheduleStateInterface } from '../../interfaces/courseScheduleState.interface';
import { offeringsActions } from './actions';

const initialState: CourseScheduleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const offeringsFeature = createFeature({
  name: 'offerings',
  reducer: createReducer(
    initialState,

    on(offeringsActions.createOffering, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(offeringsActions.createOfferingSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: [...state.data, action.offering],
    })),
    on(offeringsActions.createOfferingFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })),

    on(offeringsActions.getOffering, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(offeringsActions.getOfferingSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.offerings,
    })),
    on(offeringsActions.getOfferingFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(offeringsActions.getOfferings, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(offeringsActions.getOfferingsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.offerings,
    })),
    on(offeringsActions.getOfferingsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: offeringsFeatureKey,
  reducer: offeringsReducer,
  selectIsLoading,
  selectError,
  selectData: selectEntityData,
} = offeringsFeature;

export const selectEntityState = (state: Record<string, any>) =>
  state[offeringsFeatureKey];

export const selectOfferings = createSelector(
  selectEntityState,
  (state: CourseScheduleStateInterface) => state?.data
);

// Assuming you have a selector to get all entities
export const selectEntityById = createSelector(
  selectOfferings,
  (entities, props) => entities.find((entity) => entity.id === props.id)
);
