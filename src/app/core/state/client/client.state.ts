import { EntityState } from '@ngrx/entity';
import { Timestamp } from 'src/util/timestamp/timestamp';
import { Profile, Height } from '../profile/profile.state';
import Stripe from 'stripe';
import { Program } from '../program/program.state';

/**
 * The main data model for a Client
 */
export interface Client {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: Timestamp;
    joined: Date;
    lastCheckedIn: Date;
    height: Height;
    photoURL: string;
    assignedTrainer: Profile | null;
    assignedProgram: Program | null;
    subscriptionStatus: Stripe.Subscription.Status;
    sex: 'M' | 'F';
}

/**
 * Clients are represented by an EntityState that
 * includes a dictionary of clients and the
 * list of ids that corresponds to each client
 */
export interface ClientsState extends EntityState < Client > {
    requestInProgress: boolean;
    error: any | null;
    initialized: boolean;
}

export const INIT_CLIENT: Client = {
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
