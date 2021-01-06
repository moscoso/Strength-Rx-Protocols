import { EntityState } from '@ngrx/entity';
import { WorkoutDictionary, WorkoutID, Workout } from '../workouts/workouts.state';

/**
 * The main data model for a Program
 */
export interface Program {
    id: string;
    name: string;
    totalLengthInWeeks: number;
    phases: ProgramPhase[];
    photoURL: string;
    startDate: Date;
    dateCreated: Date;
}

/**
 * The workout schedule for a week of a Program's phase
 */
export interface WorkoutSchedule {
    day1: Workout | null;
    day2: Workout | null;
    day3: Workout | null;
    day4: Workout | null;
    day5: Workout | null;
    day6: Workout | null;
    day7: Workout | null;
}

export const INIT_PROGRAM: Program = {
    'id': '',
    'name': '',
    'totalLengthInWeeks': 0,
    'phases': [],
    'photoURL': '',
    'startDate': new Date(),
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
