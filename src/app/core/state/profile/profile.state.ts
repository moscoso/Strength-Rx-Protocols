import { EntityState } from '@ngrx/entity';

/**
 * The main data model for a Profile
 */
export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    joined: Date;
    height: Height;
    isClient: boolean;
    isTrainer: boolean;
    photoURL: string;
    clientApplicationStatus: ClientApplicationStatus;
    sex: 'M' | 'F';
}

export type Height = ImperialHeight | MetricHeight;
/**
 * A measurement of height in Imperial units of feet and inches
 */
export interface ImperialHeight { 'feet': number; 'inches': number; }
/**
 * A measurement of height in Metric units of centimeter
 */
export interface MetricHeight { 'cm': number; }

export enum ClientApplicationStatus { 'NOT_STARTED', 'PENDING', 'APPROVED' }

/**
 * Exercises are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface ProfilesState extends EntityState < Profile > {
    requestInProgress: boolean;
    error: any | null;
}

export const INIT_PROFILE: Profile = {
    'id': '',
    'photoURL': null,
    'firstName': '',
    'lastName': '',
    'birthday': new Date(),
    'joined': new Date(),
    'height': { 'cm': 0 },
    'isClient': false,
    'isTrainer': false,
    'clientApplicationStatus': ClientApplicationStatus.NOT_STARTED,
    'sex': 'M',
};
