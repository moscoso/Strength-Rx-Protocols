import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from '../helpers';
import { stripe, db, STRIPE_COLLECTION } from '../config';
import { attachSource } from './payment_sources';
import Stripe from 'stripe';
import { getOrCreateCustomer } from './customers';

/** 
 * Gets a list of a Firebase users' charges
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param limit an optional limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 */
export async function listCharges(userID: string, limit? : number) {
    const account = await db.collection(STRIPE_COLLECTION).doc(userID).get();
    const data = account.data();
    if(data){
        const customerID = data['stripeCustomerID']
        const params: Stripe.ChargeListParams = {
            limit,
            customer: customerID
        }
        return stripe.charges.list(params);
    } else {
        throw new functions.https.HttpsError(`not-found`,`Could not find Stripe document for: '${userID}'`);
    }
}

/**
 * Charges a Firebase user for a specific amount of $
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param source the payment source to charge
 * @param amount the amount to collect in pennies. For example, 2499 === $24.99
 * @param idempotencyKey an optional key used by Stripe to ensure that a charge called more than once will only be executed once
 */
export async function charge(userID: string, source: string, amount: number, idempotencyKey ? : string) {
    const customer = await getOrCreateCustomer(userID);
    const params: Stripe.ChargeCreateParams = {
        amount,
        customer: customer.id,
        source,
        currency: 'usd'
    };
    const options: Stripe.RequestOptions = { idempotencyKey }
    await attachSource(userID, source);
    return stripe.charges.create(params, options);
}

/////// CLOUD FUNCTIONS ////////

export const createCharge = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    const source = assert(data, 'source');
    const amount = assert(data, 'amount');
    // Optional
    const idempotency_key = data.itempotency_key;
    return catchErrors(charge(uid, source, amount, idempotency_key));
});

export const getCharges = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    return catchErrors(listCharges(uid, 100));
});
