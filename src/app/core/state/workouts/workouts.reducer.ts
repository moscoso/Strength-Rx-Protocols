import { createEntityAdapter } from '@ngrx/entity';
import { WorkoutAction, WorkoutActionType } from './workouts.actions';
import { Workout, WorkoutsState } from './workouts.state';

export const workoutsAdapter = createEntityAdapter < Workout > ({
    'selectId': exercise => exercise.id,
    'sortComparer': (exerciseA, exerciseB) => exerciseA.name.localeCompare(exerciseB.name)
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
            return workoutsAdapter.setAll(action.exercises, {
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
            return workoutsAdapter.addOne(action.workout, state);
        case WorkoutActionType.UpdateRequested:
            return workoutsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, state);
        case WorkoutActionType.DeleteRequested:
            return workoutsAdapter.removeOne(action.id, state);
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


