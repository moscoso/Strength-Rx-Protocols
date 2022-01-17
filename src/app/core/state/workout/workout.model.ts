import { Exercise } from '../exercise/exercise.model';

/**
 * The main data model specifying an Workout
 */
export interface Workout {
    /**
     * The unique identifier for a workout
     */
    id: WorkoutID;
    /**
     * The name of the workout
     */
    name: string;

    /**
     * Extra details to describe the workout
     */
    description: string;
    /**
     * A standard phase of a workout describes a normal exercise routine.
     *
     * Note: A value of Null indicates that this workout does not include a StandardPhase
     */
    standardPhase: StandardPhase | null;
    /**
     * An interval phase describes an interval training routine.
     *
     * Note: A value of Null indicates that this workout does not include a IntervalPhase
     */
    intervalPhase: IntervalPhase | null;
    photoURL: string;
    /**
     * A timestamp denoting when this workout was created
     */
    dateCreated: Date;
}

/**
 * A standard phase of a workout describes a normal exercise routine
 */
export interface StandardPhase {
    /**
     * An ordered list that specify the exercises to complete
     */
    exercises: Exercise[];
    /**
     * A collection of Exercise Routines specifying how to complete each exercise
     */
    exerciseRoutines: {
        [exerciseID: string]: StandardExerciseRoutine
    };
}

/**
 * A Standard Exercise Routine is a practice to improve one's fitness for
 * athletic competition, ability, or performance
 */
export interface StandardExerciseRoutine {
    /**
     * The reps or repetitions of a workout specify the number of times to complete a single exercise
     * before taking a rest or a break
     */
    reps ?: string;
    /**
     * The sets in a workout specify how many times you will repeat a particular number of reps
     * of a given exercise.
     *
     * For example let's say you're doing triceps kickbacks.
     * Two sets of 15 reps means you'll perform 15 kickbacks two times total,
     * resting between each round. In total, you'll be doing 30 kickbacks.
     */
    sets ?: string;
    /**
     * The desired "load" for an exercise (as a percentage of the 1RM)
     *
     * One-repetition maximum (one rep maximum or 1RM) in weight training is the maximum amount of weight
     * that a person can possibly lift for one repetition.
     */
    '%1rm' ?: string;
    /**
     * RPE = 'Rated Perceived Exertion'
     * Perceived Exertion is a measurement from 1-10 that describes
     * how hard one feels like one's body is working.
     * It is based on the physical sensations a person
     * experiences during physical activity, including increased heart rate,
     * increased respiration or breathing rate, increased sweating, and muscle fatigue
     */
    'rpe' ?: string;
    /**
     * Tempo in weight training refers to the speed that you lift the weight (the concentric phase of movement)
     * and how quickly you lower the weight (the eccentric phase of movement).
     */
    tempo ?: string;
    /**
     * How long to cease work or movement in order to refresh oneself and recover strength.
     */
    rest ?: string;

    /**
     * How long to rest after all the sets of the exercise are completed.
     * Note: `A null would specify no rest period`
     */
    restAfterExercise: number | null;
}

/**
 * An interval phase describes an interval training routine.
 *
 * Interval training is simply alternating short bursts
 * of intense activity with longer intervals of less intense activity.
 */
export interface IntervalPhase {
    supersets: IntervalSuperSet[];
}

/**
 * An IntervalSuperset is a collection of Interval Exercise Routines completed a specified number of times
 */
export interface IntervalSuperSet {
    /**
     * An ordered list of exercises (or rest periods) that make up the Superset
     */
    exerciseRoutines: IntervalExerciseRoutine[];
    /**
     * How many times the Superset should be completed by the trainee
     */
    sets: number;
}

/**
 * An Interval Exercise Routine is a type of training that involves a series of
 * high intensity exercises interspersed with rest or relief periods
 */
export interface IntervalExerciseRoutine {
    /**
     * The exercise of the routine. Note: `A null would indicate a rest period instead`
     */
    exercise: Exercise | null;
    /**
     * How many reps of the exercise should be done. In Interval Training, it is usually As Many Reps As Possible (AMRAP)
     */
    reps: string;
    /**
     * How long the exercise (or rest period) should be performed for in measurement of seconds
     */
    duration: number;
}

export const WORKOUT_INIT_MODEL: Workout = {
    'id': '',
    'name': '',
    'description': '',
    'standardPhase': null,
    'intervalPhase': null,
    'photoURL': '',
    'dateCreated': new Date(),
};

export const INIT_STANDARD_EXERCISE_ROUTINE: StandardExerciseRoutine = {
    'sets': undefined,
    'reps': undefined,
    '%1rm': undefined,
    'rpe': undefined,
    'tempo': undefined,
    'rest': undefined,
    'restAfterExercise': null,
};

export const INIT_INTERVAL_EXERCISE_ROUTINE: IntervalExerciseRoutine = {
    'exercise': null,
    'reps': 'AMRAP',
    'duration': 30,
};

export const INIT_INTERVAL_SUPERSET: IntervalSuperSet = {
    'exerciseRoutines': [],
    'sets': 1,
};

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
