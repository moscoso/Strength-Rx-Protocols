import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from '../helpers';
import { stripe, db, STRIPE_COLLECTION } from '../config';
import { attachSource } from './payment_sources';
import Stripe from 'stripe';
import { getOrCreateCustomer } from './customers';
import { createClient } from '../strengthrx/clients';


/**
 * Add the Stripe Subscription data to a Firestore document in the subscriptions subcollection of a user's account
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param planID the ID corresponding to the Plan of the subscription. (https://stripe.com/docs/api/plans)
 * @param subscriptionID the ID corresponding to the Subscription instance belonging to this customer
 */
export async function activateSubscription(userID: string, planID: string, subscriptionID: string): Promise<FirebaseFirestore.WriteResult> {
    const docData: { planID: string, subscriptionID: string, 'status': Stripe.Subscription
        .Status, 'created': Date } = {
            planID,
            subscriptionID,
            'created': new Date(),
            'status': 'active'
        }
    return db.doc(`${STRIPE_COLLECTION}/${userID}/subscriptions/${subscriptionID}`).set(docData, { merge: true });
}

/**
 * Update the Stripe Subscription data to a Firestore document in the subscriptions subcollection of a user's account
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param subscriptionID the ID corresponding to the Subscription instance belonging to this customer
 */
export async function updateSubscription(userID: string, subscription: Stripe.Subscription): Promise<FirebaseFirestore.WriteResult> {
    if (subscription.status === 'canceled') {
        return deactivateSubscription(userID, subscription.id);
    }
    const data = subscription.items.data;
    let planID; 
    try{
        planID = data && data[0] && data[0].price.id && data[0].price.id ? data[0].price.id : null;
    } catch {
        planID = null;
    }

    const docData = {
        'planID': planID,
        'cancel_at': subscription.cancel_at,
        'status': subscription.status
    }
    return db.doc(`${STRIPE_COLLECTION}/${userID}/subscriptions/${subscription.id}`).set(docData, { merge: true });
}

/**
 * Deactivate the Stripe Subscription data stored in a Firestore document in the subscriptions subcollection of a user's account
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param subscriptionID the ID corresponding to the Subscription instance belonging to this customer
 */
async function deactivateSubscription(userID: string, subscriptionID: string): Promise<FirebaseFirestore.WriteResult> {
    const docData: { 'status': Stripe.Subscription.Status, 'canceled': Date } = {
        'status': 'canceled',
        'canceled': new Date()
    }
    return db.doc(`${STRIPE_COLLECTION}/${userID}/subscriptions/${subscriptionID}`).set(docData, { merge: true });
}


/**
 * Gets a user's subscriptions
 * @param userID the unique identifier corresponding to the user in Firebase
 */
export async function listSubscriptions(userID: string): Promise < Stripe.ApiList < Stripe.Subscription >> {
    const customer = await getOrCreateCustomer(userID);
    return stripe.subscriptions.list({ 'customer': customer.id });
}

/**
 * Creates and charges user for a new subscription
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param source the payment source to charge
 * @param plan the ID corresponding to the Plan of the subscription. (https://stripe.com/docs/api/plans)
 * @param coupon the ID corresponding to the Coupon (generated in the Stripe dashboard) 
 */
export async function createSubscription(userID: string, source: string, plan: string, coupon ? : string): Promise <
    Stripe.Subscription > {
        const customer = await getOrCreateCustomer(userID);
        await attachSource(userID, source);
        const subscription: Stripe.Subscription = await stripe.subscriptions.create({
            customer: customer.id,
            coupon,
            items: [{
                plan
            } ]
        });
        await createClient(userID, subscription);
        await activateSubscription(userID, plan, subscription.id);
        return subscription;
    }

/**
 * Cancels a subscription immediately and stops all recurring payments
 */
export async function deleteSubscription(userID: string, subID: string): Promise < any > {
    const subscription = await stripe.subscriptions.del(subID);
    await deactivateSubscription(userID, subscription.id);
    return subscription;
}

/////// CLOUD FUNCTIONS ////////

export const startSubscription = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    const source = assert(data, 'source');
    const plan = assert(data, 'plan');
    return catchErrors(createSubscription(uid, source, plan, data.coupon));
});

export const cancelSubscription = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    const plan = assert(data, 'plan');
    return catchErrors(deleteSubscription(uid, plan));
});

export const getSubscriptions = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    return catchErrors(listSubscriptions(uid));
});
