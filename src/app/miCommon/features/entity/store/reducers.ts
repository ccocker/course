import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
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

    on(entityActions.createEntity, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(entityActions.createEntitySuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: [...state.data, action.entity],
    })),
    on(entityActions.createEntityFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })),

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

    on(entityActions.getEntities, (state) => ({ ...state, isLoading: true })),
    on(entityActions.getEntitiesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.entities,
    })),
    on(entityActions.getEntitiesFailure, (state) => ({
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

export const selectEntityState = (state: Record<string, any>) =>
  state[entityFeatureKey];

export const selectEntities = createSelector(
  selectEntityState,
  (state: EntityStateInterface) => state?.data
);

// Assuming you have a selector to get all entities
export const selectEntityById = createSelector(
  selectEntities,
  (entities, props) => entities.find((entity) => entity.id === props.id)
);
