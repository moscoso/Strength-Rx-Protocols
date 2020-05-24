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
        case ExerciseActionType.AllRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ExerciseActionType.AllLoaded:
            return exerciseAdapter.setAll(action.exercises, {
                ...state,
                'requestInProgress': false,
            });
        case ExerciseActionType.Created:
        case ExerciseActionType.Updated:
        case ExerciseActionType.Deleted:
            return {
                ...state,
                'requestInProgress': false,
                'error': null,
            };
        case ExerciseActionType.CreateRequested:
            return exerciseAdapter.addOne(action.exercise, {
                ...state,
                'requestInProgress': true,
            });
        case ExerciseActionType.UpdateRequested:
            return exerciseAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': true,
            });
        case ExerciseActionType.DeleteRequested:
            return exerciseAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': true,
            });
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


