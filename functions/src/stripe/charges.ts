import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from '../helpers';
import { stripe, db, STRIPE_COLLECTION } from '../config';
import { attachSource } from './payment_sources';
import Stripe from 'stripe';
import { getOrCreateCustomer } from './customers';

/** 
 * Gets a user's charge history
 * @param userID the ID that corresponds to the user in Firebase
 * @param limit a limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 */
export async function getUserCharges(userID: string, limit ? : number) {
    const account = await db.collection(STRIPE_COLLECTION).doc(userID).get();
    const data = account.data();
    if(data){
        const customerID = data['stripeCustomerID']
        const params: Stripe.ChargeListParams = {
            limit,
            customer: customerID
        }
        return await stripe.charges.list(params);
    } else {
        throw new Error(`Could not find Stripe account for ${userID}`);
    }
}

/**
 * Creates a charge for a specific amount
 * @param userID the ID that corresponds to the customer in Stripe
 * @param source the payment source to charge
 * @param amount the payment amount in pennies or the currenciey's lowest common deominator. (i.e 2501 === $25.01)
 * @param idempotency_key a key used by Stripe to ensure that a charge called more than once will only be executed once
 */
export async function createCharge(userID: string, source: string, amount: number, idempotency_key ? : string) {
    const customer = await getOrCreateCustomer(userID);
    const params: Stripe.ChargeCreateParams = {
        amount,
        customer: customer.id,
        source,
        currency: 'usd',
    };
    const options: Stripe.RequestOptions = { idempotency_key }
    await attachSource(userID, source);
    return stripe.charges.create(params, options);
}

/////// DEPLOYABLE FUNCTIONS ////////

export const stripeCreateCharge = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    const source = assert(data, 'source');
    const amount = assert(data, 'amount');
    // Optional
    const idempotency_key = data.itempotency_key;
    return catchErrors(createCharge(uid, source, amount, idempotency_key));
});

export const stripeGetCharges = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    return catchErrors(getUserCharges(uid, 100));
});
