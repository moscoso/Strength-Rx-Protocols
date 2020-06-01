import { EntityState } from '@ngrx/entity';

/**
 * The main data model for a Check-In
 */
export interface CheckIn {
    'id': string;
    'macros': string;
    'cardioProtocol': string;
    'missedCardio': string;
    'medicalIssues': string;
    'menstrualCycle': string;
    'adherenceLevel': string;
    'weekSummary': string;
    'energyLevel': string;
    'requests': string;
    'questions': string;
    'monday': string;
    'tuesday': string;
    'wednesday': string;
    'thursday': string;
    'friday': string;
    'saturday': string;
    'sunday': string;
    'userID': string;
    'timestamp': Date;
}

export const INIT_CHECK_IN: CheckIn = {
    'id': null,
    'macros': '',
    'cardioProtocol': '',
    'missedCardio': '',
    'medicalIssues': '',
    'menstrualCycle': '',
    'adherenceLevel': '',
    'weekSummary': '',
    'energyLevel': '',
    'requests': '',
    'questions': '',
    'monday': '',
    'tuesday': '',
    'wednesday': '',
    'thursday': '',
    'friday': '',
    'saturday': '',
    'sunday': '',
    'userID': null,
    'timestamp': new Date (),
};

/**
 * Exercises are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface CheckInsState extends EntityState < CheckIn > {
    requestInProgress: boolean;
    error: any | null;
}
