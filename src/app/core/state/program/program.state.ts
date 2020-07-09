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
    day1: string[] | null;
    day2: string[] | null;
    day3: string[] | null;
    day4: string[] | null;
    day5: string[] | null;
    day6: string[] | null;
    day7: string[] | null;
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
