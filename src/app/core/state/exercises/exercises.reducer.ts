import { createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExerciseAction, ExerciseActionType } from './exercises.actions';
import { ExercisesState, Exercise } from './exercises.state';

export const exerciseAdapter = createEntityAdapter < Exercise > ({
    'selectId': exercise => exercise.id,
    'sortComparer': (exerciseA, exerciseB) => exerciseA.name.localeCompare(exerciseB.name)
});
const initialState: ExercisesState = exerciseAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
export function exercisesReducer(state: ExercisesState = initialState, action: ExerciseAction): ExercisesState {
    switch (action.type) {
        case ExerciseActionType.AllExercisesRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ExerciseActionType.AllExercisesLoaded:
            return exerciseAdapter.setAll(action.exercises, {
                ...state,
                'requestInProgress': false,
            });
        case ExerciseActionType.Created:
            return exerciseAdapter.addOne(action.exercise, state);
        case ExerciseActionType.Updated:
            return exerciseAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, state);
        case ExerciseActionType.Deleted:
            return exerciseAdapter.removeOne(action.id, state);
        case ExerciseActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                'requestInProgress': false,
            };
        default:
            return state;
    }
}

