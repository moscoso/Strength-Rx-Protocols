import { EntityState } from '@ngrx/entity';
import { Timestamp } from 'src/util/timestamp/timestamp';

/**
 * The main data model for a Profile
 */
export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    birthday: Timestamp;
    joined: Date;
    height: Height;
    isClient: boolean;
    isTrainer: boolean;
    photoURL: string;
    assignedTrainer: Profile | null;
    clientApplicationStatus: ClientApplicationStatus;
    sex: 'M' | 'F';
}

export type Height = ImperialHeight;
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
 * Profiles are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface ProfilesState extends EntityState < Profile > {
    requestInProgress: boolean;
    error: any | null;
    initialized: boolean;
}

export const INIT_PROFILE: Profile = {
    'id': '',
    'photoURL': null,
    'firstName': '',
    'lastName': '',
    'birthday': undefined,
    'joined': new Date(),
    'height': { 'feet': 0, 'inches': 0 },
    'isClient': false,
    'isTrainer': false,
    'assignedTrainer': null,
    'clientApplicationStatus': ClientApplicationStatus.NOT_STARTED,
    'sex': 'M',
};
