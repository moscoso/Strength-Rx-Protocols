import { ExerciseAction, ExerciseActionType } from './exercise.actions';
import { exerciseAdapter, ExercisesState, EXERCISES_INIT_STATE } from './exercise.state';


export function exercisesReducer(state: ExercisesState = EXERCISES_INIT_STATE, action: ExerciseAction): ExercisesState {
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
