
import { ExercisesState } from './exercises.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { exerciseAdapter } from './exercises.reducer';

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

export const selectExerciseByID = (exerciseID: string) => createSelector(
    selectState,
    (state: ExercisesState) => state.entities[exerciseID]
);
