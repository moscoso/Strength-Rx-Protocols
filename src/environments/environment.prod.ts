import {firebase} from '../config/firebase';
import {stripe} from '../config/stripe';

export const environment = {
    'production': true,
    'firebase': firebase.production,
    'stripePK': stripe.production,
    'hostURL': 'https://strengthrx.pro'
};
