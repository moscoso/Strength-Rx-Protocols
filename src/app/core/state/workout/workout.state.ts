import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Workout } from './workout.model';

/**
 * Workouts are represented by an EntityState that
 * includes a dictionary of workouts and the
 * list of ids that corresponds to each workouts
 */
export interface WorkoutState extends EntityState < Workout > {
    requestInProgress: boolean;
    error: any | null;
}

export const workoutsAdapter = createEntityAdapter < Workout > ({
    'selectId': workout => workout.id,
    'sortComparer': (workoutA, workoutB) => workoutA.name.localeCompare(workoutB.name)
});

export const WORKOUT_INIT_STATE: WorkoutState = workoutsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
