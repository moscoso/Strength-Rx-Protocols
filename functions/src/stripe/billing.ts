import * as functions from 'firebase-functions';
import { assertUID, catchErrors } from '../helpers';
import { getCustomerID } from './customers';
import { stripe } from '../config';
import Stripe from 'stripe';

/**
 * Create a billing portal link
 */
async function createBillingSession(userID: string, returnURL?: string): Promise<Stripe.BillingPortal.Session> {
    const customer = await getCustomerID(userID);
    const params: Stripe.BillingPortal.SessionCreateParams = {
        customer,
        // return_url: returnURL
    };
    const session = await stripe.billingPortal.sessions.create(params);
    console.log(`✅Created billing portal link for user [${userID}].`);
    return session
};

export const stripeCreateBillingPortalLink = functions.https.onCall(async (data, context) => {
    const userID = assertUID(context);
    return catchErrors(createBillingSession(userID));
});
