
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { workoutsAdapter } from './workouts.reducer';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { WorkoutsState, Workout } from './workouts.state';

/**
 * Gets the top-level state property named 'exercises' of the store tree.
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
 * Select an Exercise by ID
 * @param exerciseID the ID of the exercise
 */
export const selectWorkoutByID = (exerciseID: string) => createSelector(
    selectState,
    (state: WorkoutsState) => state.entities[exerciseID]
);

/**
 * Use the router state's URL to select an Exercise by ID.
 */
// export const selectWorkoutByRouteURL = createSelector(
//     selectEntities,
//     selectRouterState,
//     (entities: Dictionary<Workout>, router: RouterReducerState<any>) => {
//         return router.state && entities[router.state.params.orderID];
//     }
// );
