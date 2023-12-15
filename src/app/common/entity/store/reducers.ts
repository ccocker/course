import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityStateInterface } from '../interfaces/entityState.interface';
import { entityActions } from './actions';

const initialState: EntityStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const entityFeature = createFeature({
  name: 'entity',
  reducer: createReducer(
    initialState,
    on(entityActions.getEntity, (state) => ({ ...state, isLoading: true })),
    on(entityActions.getEntitySuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.entity,
    })),
    on(entityActions.getEntityFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: entityFeatureKey,
  reducer: entityReducer,
  selectIsLoading,
  selectError,
  selectData: selectEntityData,
} = entityFeature;
