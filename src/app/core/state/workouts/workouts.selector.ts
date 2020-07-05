
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { workoutsAdapter } from './workouts.reducer';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { WorkoutsState, Workout } from './workouts.state';
import { selectRouterState } from '../router/router.selectors';

/**
 * Gets the top-level state property named 'workouts' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const selectState = createFeatureSelector < WorkoutsState > ('workouts');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = workoutsAdapter.getSelectors(selectState);

/**
 * Select an Workout by ID
 * @param workoutID the ID of the workout
 */
export const selectWorkoutByID = (workoutID: string) => createSelector(
    selectState,
    (state: WorkoutsState) => state.entities[workoutID]
);

/**
 * Use the router state's URL to select an Workout by ID.
 */
export const selectWorkoutByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Workout>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.id];
    }
);


/**
 * Select a boolean that represents a Request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: WorkoutsState) => state.requestInProgress
);
