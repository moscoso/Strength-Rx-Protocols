
import { ExercisesState, Exercise } from './exercises.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { exerciseAdapter } from './exercises.reducer';
import { selectRouterState } from '../router/router.selectors';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';

/**
 * Gets the top-level state property named 'exercises' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const selectState = createFeatureSelector < ExercisesState > ('exercises');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = exerciseAdapter.getSelectors(selectState);

/**
 * Select an Exercise by ID
 * @param exerciseID the ID of the exercise
 */
export const selectExerciseByID = (exerciseID: string) => createSelector(
    selectState,
    (state: ExercisesState) => state.entities[exerciseID]
);

/**
 * Use the router state's URL to select an Exercise by ID.
 */
export const selectExerciseByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Exercise>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.orderID];
    }
);
