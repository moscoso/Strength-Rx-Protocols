import { createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { ExerciseAction, ExerciseActionType } from './exercises.actions';
import { ExercisesState, Exercise } from './exercises.state';

const exerciseAdapter = createEntityAdapter < Exercise > ({
    'selectId': exercise => exercise.id,
    'sortComparer': (exerciseA, exerciseB) => exerciseA.name.localeCompare(exerciseB.name)
});
const initialState: ExercisesState = exerciseAdapter.getInitialState({
    'loading': false,
});
export function ExerciseReducer(state: ExercisesState = initialState, action: ExerciseAction): ExercisesState {
    switch (action.type) {
        case ExerciseActionType.Load_Initiated:
            return exerciseAdapter.setAll(action.exercises, state);
        case ExerciseActionType.Created:
            return exerciseAdapter.addOne(action.exercise, state);

        case ExerciseActionType.Updated:
            return exerciseAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, state);

        case ExerciseActionType.Deleted:
            return exerciseAdapter.removeOne(action.id, state);

        default:
            return state;
    }
}

/**
 * Gets the top-level Exercise state property of the state tree.
 *
 * Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const getState = createFeatureSelector < ExercisesState > ('exercise');
export const {
    selectIds,
    selectEntities ,
    selectAll,
    selectTotal
} = exerciseAdapter.getSelectors(getState);
