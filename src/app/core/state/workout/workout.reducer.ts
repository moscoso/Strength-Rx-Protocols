import { WorkoutAction, WorkoutActionType } from './workout.actions';
import { workoutsAdapter, WorkoutState, WORKOUT_INIT_STATE } from './workout.state';


export function workoutsReducer(state: WorkoutState = WORKOUT_INIT_STATE, action: WorkoutAction): WorkoutState {
    switch (action.type) {
        case WorkoutActionType.AllRequested:
        case WorkoutActionType.CreateRequested:
        case WorkoutActionType.UpdateRequested:
        case WorkoutActionType.DeleteRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case WorkoutActionType.AllLoaded:
            return workoutsAdapter.setAll(action.workouts, {
                ...state,
                'requestInProgress': false,
            });
        case WorkoutActionType.Created:
            return workoutsAdapter.addOne(action.workout, {
                ...state,
                'requestInProgress': false,
            });
        case WorkoutActionType.Updated:
            return workoutsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': false,
            });
        case WorkoutActionType.Deleted:
            return workoutsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': false,
            });
        case WorkoutActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                'requestInProgress': false,
            };
        default:
            return state;
    }
}


