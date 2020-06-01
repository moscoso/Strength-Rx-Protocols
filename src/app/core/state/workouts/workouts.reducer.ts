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
        case WorkoutActionType.Created:
        case WorkoutActionType.Updated:
        case WorkoutActionType.Deleted:
            return {
                ...state,
                'requestInProgress': false,
                'error': null,
            };
        case WorkoutActionType.CreateRequested:
            return workoutsAdapter.addOne(action.workout, {
                ...state,
                'requestInProgress': true,
            });
        case WorkoutActionType.UpdateRequested:
            return workoutsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': true,
            });
        case WorkoutActionType.DeleteRequested:
            return workoutsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': true,
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


