
import { exerciseAdapter, ExercisesState } from './exercise.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { selectParams } from '../router/router.selectors';
import { Params } from '@angular/router';
import { Exercise } from './exercise.model';

/**
 * Gets the top-level state property named 'exercises' of the store tree.
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
 * @param exerciseID the unique identifier of the exercise
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

/**
 * Select a boolean that indicates a request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ExercisesState) => state.requestInProgress
);
