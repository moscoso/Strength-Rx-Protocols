import { EntityState } from '@ngrx/entity';
import { WorkoutDictionary, WorkoutID } from '../workouts/workouts.state';

/**
 * The main data model for a Program
 */
export interface Program {
    id: string;
    name: string;
    totalLengthInWeeks: number;
    workouts: WorkoutDictionary;
    phases: ProgramPhase[];
    photoURL: string;
    dateCreated: Date;
}

/**
 * The workout schedule for a week of a Program's phase
 */
export interface WorkoutSchedule {
    day1: WorkoutID | null;
    day2: WorkoutID | null;
    day3: WorkoutID | null;
    day4: WorkoutID | null;
    day5: WorkoutID | null;
    day6: WorkoutID | null;
    day7: WorkoutID | null;
}

export const INIT_PROGRAM: Program = {
    'id': '',
    'name': '',
    'workouts': {},
    'totalLengthInWeeks': 0,
    'phases': [],
    'photoURL': '',
    'dateCreated': new Date(),
};

/**
 * A distinct stage in a training Program.
 * Each phase is broken up into a weekly schedule and each phase typically lasts for several weeks.
 */
export interface ProgramPhase {
    name: string;
    schedule: WorkoutSchedule;
    lengthInWeeks: number;
}

/**
 * Initialize a Program Phase with default values
 */
export const INIT_PROGRAM_PHASE: ProgramPhase = {
    'name': 'unnamed phase',
    'lengthInWeeks': 1,
    'schedule': {
        'day1': null,
        'day2': null,
        'day3': null,
        'day4': null,
        'day5': null,
        'day6': null,
        'day7': null,
    },
};

/**
 * Programs are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface ProgramsState extends EntityState < Program > {
    requestInProgress: boolean;
    error: any | null;
}
