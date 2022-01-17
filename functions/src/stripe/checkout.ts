import * as functions from 'firebase-functions';
import { stripe } from '../config';
import Stripe from 'stripe';
import { getOrCreateCustomer } from './customers';
import { assertUID, catchErrors, assert } from '../helpers';

/**
 * 
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param priceID The ID of the [Price](https://stripe.com/docs/api/prices) or [Plan](https://stripe.com/docs/api/plans) object.
 * @param hostURL the host URL of the app initiating the checkout session
 * @returns a Stripe checkout session object
 */
async function createCheckoutSession(userID: string, priceID: string, hostURL: string) {
    const customer = await getOrCreateCustomer(userID);
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        'price': priceID,
        'quantity': 1
    }
    const params: Stripe.Checkout.SessionCreateParams = {
        line_items: [lineItem],
        payment_method_types: ['card'],
        customer: customer.id,
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: `${hostURL}/thank-you`,
        cancel_url: `${hostURL}/start-membership`
    }

    const session: Promise<Stripe.Response<Stripe.Checkout.Session>> = stripe.checkout.sessions.create(params);
    return session;
}

/////// CLOUD FUNCTIONS ////////

export const checkout = functions.https.onCall(async (data, context) => {
    const userID = assertUID(context);
    const priceID = assert(data, 'priceID')
	// Optional
    const hostURL = data.hostURL ? data.hostURL : 'https://strengthrx.pro';
    return catchErrors(createCheckoutSession(userID, priceID, hostURL));
});
