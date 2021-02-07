import Stripe from 'stripe';
import { Height, Profile } from '../profile/profile.model';
import { Program } from '../program/program.model';

/**
 * The main data model for a Client
 */
export interface Client {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    joined: Date;
    lastCheckedIn: Date;
    height: Height;
    photoURL: string;
    assignedTrainer: Profile | null;
    assignedProgram: Program | null;
    subscriptionStatus: Stripe.Subscription.Status;
    sex: 'M' | 'F';
}

export const CLIENT_INIT_MODEL: Client = {
    'id': '',
    'email': '',
    'photoURL': null,
    'firstName': '',
    'lastName': '',
    'birthday': undefined,
    'joined': new Date(),
    'lastCheckedIn': new Date (),
    'height': { 'feet': 0, 'inches': 0 },
    'assignedTrainer': null,
    'assignedProgram': null,
    'subscriptionStatus': 'unpaid',
    'sex': 'M',
};
