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

export const CHECK_IN_INIT_MODEL: CheckIn = {
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
