import { Timestamp } from 'src/util/timestamp/timestamp';

/**
 * The main data model specifying a Profile
 */
export interface Profile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: Timestamp;
    goal: string;
    healthConditions: string;
    joined: Date;
    height: Height;
    isClient: boolean;
    isTrainer: boolean;
    photoURL: string;
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

export const PROFILE_INIT_MODEL: Profile = {
    'id': '',
    'email': '',
    'photoURL': null,
    'firstName': '',
    'lastName': '',
    'birthday': undefined,
    'goal': '',
    'joined': new Date(),
    'healthConditions': '',
    'height': { 'feet': 0, 'inches': 0 },
    'isClient': false,
    'isTrainer': false,
    'sex': 'M',
};
