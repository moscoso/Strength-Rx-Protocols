import { stripe } from '../config'; 
import { assert, catchErrors } from '../helpers';

import * as functions from 'firebase-functions';
import Stripe from 'stripe';


/**
 *	Returns a coupon from Stripe
 */
export function getCoupon(coupon: string): Promise<Stripe.Coupon> {
    return stripe.coupons.retrieve(coupon);
}

/////// CLOUD FUNCTIONS ////////
export const stripeGetCoupon= functions.https.onCall( async (data, context) => {
    const coupon = assert(data, 'coupon');
    return catchErrors(getCoupon(coupon));
});