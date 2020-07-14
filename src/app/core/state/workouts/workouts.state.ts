import { EntityState } from '@ngrx/entity';
import { Exercise } from '../exercises/exercises.state';

/**
 * The main data model for an Workout
 */
export interface Workout {
    id: string;
    name: string;
    exercises: Exercise[];
    exerciseRoutines: {
        [exerciseID: string]: ExerciseRoutine
    };
    photoURL: string;
    dateCreated: Date;
}

export interface ExerciseRoutine {
    sets ?: string;
    reps ?: string;
    percentageOfOneRepMax ?: string;
    rateOfPerceivedExertion ?: string;
    tempo ?: string;
    rest ?: string;
}

export const INIT_WORKOUT: Workout = {
    'id': '',
    'name': '',
    'exercises': [],
    'exerciseRoutines': {},
    'photoURL': '',
    'dateCreated': new Date(),
};

/**
 * Workouts are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface WorkoutsState extends EntityState < Workout > {
    requestInProgress: boolean;
    error: any | null;
}
