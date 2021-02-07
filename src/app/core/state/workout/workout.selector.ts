
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { workoutsAdapter, WorkoutState } from './workout.state';
import { selectRouterState } from '../router/router.selectors';
import { Workout } from './workout.model';


/**
 * Selects the top-level state property 'workouts' of the store tree.
 */
export const selectState = createFeatureSelector < WorkoutState > ('workouts');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = workoutsAdapter.getSelectors(selectState);

/**
 * Select an Workout by ID
 * @param workoutID the unique identifier of the workout
 */
export const selectWorkoutByID = (workoutID: string) => createSelector(
    selectState,
    (state: WorkoutState) => state.entities[workoutID]
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
 * Select a boolean that indicates a request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: WorkoutState) => state.requestInProgress
);
