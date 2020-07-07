import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from '../helpers';
import { stripe, db, STRIPE_COLLECTION } from '../config';
import { attachSource } from './payment_sources';
import Stripe from 'stripe';


/**
 * Gets a user's subscriptions
 * @param userID the ID corresponding to the user
 */
export async function getSubscriptions(userID: string): Promise<Stripe.ApiList<Stripe.Subscription>> {
    return stripe.subscriptions.list({ customer: userID });
}

/**
 * Creates and charges user for a new subscription
 * @param userID the ID corresponding to the user
 * @param source the payment source to charge
 * @param plan the ID corresponding to the Plan of the subscription. (https://stripe.com/docs/api/plans)
 * @param coupon the ID corresponding to the Coupon (generated in the Stripe dashboard) 
 */
export async function createSubscription(userID: string, source: string, plan: string, coupon? : string): Promise <Stripe.Subscription> {
    await attachSource(userID, source);
    const subscription: Stripe.Subscription = await stripe.subscriptions.create({
        customer: userID,
        coupon,
        items: [{
            plan,
        }, ],
    });
    // Add the plan to existing subscriptions
    const docData = {
        [plan]: true,
        [subscription.id]: 'active',
        'created': new Date(),
    }

    await db.doc(`${STRIPE_COLLECTION}/${userID}`).set(docData, { merge: true });
    return subscription;
}

/**
 * Cancels a subscription and stops all recurring payments
 */
export async function cancelSubscription(userID: string, subId: string): Promise < any > {
    const subscription = await stripe.subscriptions.del(subId);
    const docData: any = {
        [subscription.id]: 'canceled',
        'canceled': new Date(),
    }
    if (subscription.plan !== null) {
        docData[subscription.plan.id] = false;
    }
    await db.doc(`${STRIPE_COLLECTION}/${userID}`).set(docData, { merge: true });
    return subscription;
}

/////// DEPLOYABLE FUNCTIONS ////////

export const stripeCreateSubscription = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    const source = assert(data, 'source');
    const plan = assert(data, 'plan');
    return catchErrors(createSubscription(uid, source, plan, data.coupon));
});

export const stripeCancelSubscription = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    const plan = assert(data, 'plan');
    return catchErrors(cancelSubscription(uid, plan));
});

export const stripeGetSubscriptions = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    return catchErrors(getSubscriptions(uid));
});
