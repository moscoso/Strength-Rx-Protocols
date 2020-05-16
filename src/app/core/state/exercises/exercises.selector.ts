
import { ExercisesState } from './exercises.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { exerciseAdapter } from './exercises.reducer';

/**
 * Gets the top-level store property named 'exercises' of the state tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const getState = createFeatureSelector < ExercisesState > ('exercises');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = exerciseAdapter.getSelectors(getState);

export const getExerciseByID = (exerciseID: string) => createSelector(
    getState,
    (state: ExercisesState) => state.entities[exerciseID]
);
