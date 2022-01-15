import { Workout } from '../workout/workout.model';

/**
 * The main data model specifying a Program
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
 * The schedule for a week of a Program's phase set to either a workout or
 * a rest day specified by a null
 */
export interface WeeklySchedule {
    day1: Workout | null;
    day2: Workout | null;
    day3: Workout | null;
    day4: Workout | null;
    day5: Workout | null;
    day6: Workout | null;
    day7: Workout | null;
}

export type WeeklyScheduleIndex = 'day1'| 'day2' | 'day3' | 'day4' | 'day5' | 'day6' | 'day7';

export const PROGRAM_INIT_MODEL: Program = {
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
    schedule: WeeklySchedule;
    lengthInWeeks: number;
}

/**
 * Initialize a Program Phase with default values
 */
export const PROGRAM_PHASE_INIT_MODEL: ProgramPhase = {
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
