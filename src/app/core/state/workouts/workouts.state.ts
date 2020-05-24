import { EntityState } from '@ngrx/entity';
import { Exercise } from '../exercises/exercises.state';

/**
 * The main data model for an Exercise
 */
export interface Workout {
    id: string;
    name: string;
    exercises: Exercise[];
    exerciseRoutines: {
        [exerciseID: string]: ExerciseRoutine
    };
}

export interface ExerciseRoutine {
    sets?: number;
    reps?: number;
    minutes?: number;
    seconds?: number;
}

export const INIT_EXERCISE: Workout = {
    'id': '',
    'name': '',
    'exercises': [],
    'exerciseRoutines': {},
};

/**
 * Exercises are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface WorkoutsState extends EntityState < Workout > {
    requestInProgress: boolean;
    error: any | null;
}
