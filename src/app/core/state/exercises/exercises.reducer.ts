import { createEntityAdapter } from '@ngrx/entity';
import { ExerciseAction, ExerciseActionType } from './exercises.actions';
import { ExercisesState, Exercise } from './exercises.state';

export const exerciseAdapter = createEntityAdapter < Exercise > ({
    'selectId': exercise => exercise.id,
    'sortComparer': sortByName,
});

export function sortByName(a: Exercise, b: Exercise): number {
    return a.name.localeCompare(b.name);
}


const initialState: ExercisesState = exerciseAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
export function exercisesReducer(state: ExercisesState = initialState, action: ExerciseAction): ExercisesState {
    switch (action.type) {
        case ExerciseActionType.AllRequested:
        case ExerciseActionType.CreateRequested:
        case ExerciseActionType.UpdateRequested:
        case ExerciseActionType.DeleteRequested:
        case ExerciseActionType.RefreshAllRequested:
        case ExerciseActionType.RefreshOneRequested:
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
        case ExerciseActionType.OneLoaded:
            return exerciseAdapter.setOne(action.exercise, {
                ...state,
                'requestInProgress': false,
            });
        case ExerciseActionType.Created:
            return exerciseAdapter.addOne(action.exercise, {
                ...state,
                'requestInProgress': false,
            });
        case ExerciseActionType.Updated:
            return exerciseAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': false,
            });
        case ExerciseActionType.Deleted:
            return exerciseAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': false,
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
