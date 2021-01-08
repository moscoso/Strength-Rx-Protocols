import {firebase} from '../config/firebase';
import {stripe} from '../config/stripe';

export const environment = {
    'production': true,
    'firebase': firebase.staging,
    'stripePK': stripe.staging,
};
