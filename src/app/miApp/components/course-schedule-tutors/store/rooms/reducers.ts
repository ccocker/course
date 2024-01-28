import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CourseScheduleStateInterface } from '../../interfaces/courseScheduleState.interface';
import { roomsActions } from './actions';

const initialState: CourseScheduleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const roomsFeature = createFeature({
  name: 'rooms',
  reducer: createReducer(
    initialState,

    on(roomsActions.createRoom, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(roomsActions.createRoomSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: [...state.data, action.room],
    })),
    on(roomsActions.createRoomFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })),

    on(roomsActions.getRoom, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(roomsActions.getRoomSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.rooms,
    })),
    on(roomsActions.getRoomFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(roomsActions.getRooms, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(roomsActions.getRoomsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.rooms,
    })),
    on(roomsActions.getRoomsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: roomsFeatureKey,
  reducer: roomsReducer,
  selectIsLoading,
  selectError,
  selectData: selectEntityData,
} = roomsFeature;

export const selectEntityState = (state: Record<string, any>) =>
  state[roomsFeatureKey];

export const selectRooms = createSelector(
  selectEntityState,
  (state: CourseScheduleStateInterface) => state?.data
);

// Assuming you have a selector to get all entities
export const selectEntityById = createSelector(selectRooms, (entities, props) =>
  entities.find((entity) => entity.id === props.id)
);
