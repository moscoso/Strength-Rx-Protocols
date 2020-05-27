
import { ExercisesState, Exercise } from './exercises.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { exerciseAdapter } from './exercises.reducer';
import { Dictionary } from '@ngrx/entity';
import { selectParams } from '../router/router.selectors';
import { Params } from '@angular/router';

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
    selectParams,
    (entities: Dictionary<Exercise>, params: Params) => {
        const entityID = params.id;
        return entities[entityID];
    }
);
