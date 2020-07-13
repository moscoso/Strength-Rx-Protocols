import { EntityState } from '@ngrx/entity';
import { Workout } from '../workouts/workouts.state';

/**
 * The main data model for an Program
 */
export interface Program {
    id: string;
    name: string;
    lengthInWeeks: number;
    workouts: Workout[];
    schedule: ProgramSchedule;
    photoURL: string;
    dateCreated: Date;
}

export interface ProgramSchedule {
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
    'lengthInWeeks': 0,
    'workouts': [],
    'schedule': {
        'day1': null,
        'day2': null,
        'day3': null,
        'day4': null,
        'day5': null,
        'day6': null,
        'day7': null,
    },
    'photoURL': '',
    'dateCreated': new Date(),
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
