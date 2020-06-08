import { createEntityAdapter } from '@ngrx/entity';
import { WorkoutAction, WorkoutActionType } from './workouts.actions';
import { Workout, WorkoutsState } from './workouts.state';

export const workoutsAdapter = createEntityAdapter < Workout > ({
    'selectId': workout => workout.id,
    'sortComparer': (workoutA, workoutB) => workoutA.name.localeCompare(workoutB.name)
});
const initialState: WorkoutsState = workoutsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
export function workoutsReducer(state: WorkoutsState = initialState, action: WorkoutAction): WorkoutsState {
    switch (action.type) {
        case WorkoutActionType.AllRequested:
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
        case WorkoutActionType.CreateRequested:
        case WorkoutActionType.UpdateRequested:
        case WorkoutActionType.DeleteRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
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


