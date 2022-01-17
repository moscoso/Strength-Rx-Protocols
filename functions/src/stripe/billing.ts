import * as functions from 'firebase-functions';
import { assertUID, catchErrors } from '../helpers';
import { getCustomerID } from './customers';
import { stripe } from '../config';
import Stripe from 'stripe';

/**
 * Creates a session of the customer portal.
 * 
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param returnURL the URL to which Stripe should send customers when they click on the link to return to your website.
 * @returns a billing session object
 */
async function createBillingSession(userID: string, returnURL?: string): Promise<Stripe.BillingPortal.Session> {
    const customer = await getCustomerID(userID);
    const params: Stripe.BillingPortal.SessionCreateParams = {
        customer
        // return_url: returnURL
    };
    const session = await stripe.billingPortal.sessions.create(params);
    console.log(`✅Created billing portal link for user [${userID}].`);
    return session
}

/////// CLOUD FUNCTIONS ////////

export const createBillingPortal = functions.https.onCall(async (data, context) => {
    const userID = assertUID(context);
    return catchErrors(createBillingSession(userID));
});
