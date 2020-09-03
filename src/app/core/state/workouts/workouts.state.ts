import { EntityState } from '@ngrx/entity';
import { Exercise } from '../exercises/exercises.state';

/**
 * The main data model for an Workout
 */
export interface Workout {
    id: WorkoutID;
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

export const INIT_EXERCISE_ROUTINE: ExerciseRoutine = {
    'sets': null,
    'reps': null,
    'percentageOfOneRepMax': null,
    'rateOfPerceivedExertion': null,
    'tempo': null,
    'rest': null,
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

/**
 * A unique identifier for a workout
 */
export type WorkoutID = string;
/**
 * A dictionary that maps a WorkoutID to a Workout
 */
export interface WorkoutDictionary {
    [workoutID: string]: Workout;
}
