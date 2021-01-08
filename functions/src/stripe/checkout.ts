import * as functions from 'firebase-functions';
import { stripe } from '../config';
import Stripe from 'stripe';
import { getOrCreateCustomer } from './customers';
import { assertUID, catchErrors, assert } from '../helpers';

async function createCheckoutSession(userID: string, priceID: string, hostURL = 'https://strengthrx.pro', idempotencyKey: string) {
    const customer = await getOrCreateCustomer(userID);
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        'price': priceID,
        'quantity': 1,
    }
    const params: Stripe.Checkout.SessionCreateParams = {
        line_items: [lineItem],
        payment_method_types: ['card'],
        customer: customer.id,
        
        mode: 'subscription',
        success_url: `${hostURL}/thank-you`,
        cancel_url: `${hostURL}/start-membership`,
    }
    // const options: Stripe.RequestOptions = { idempotencyKey }
    const session = await stripe.checkout.sessions.create(params);
    return session;
}

export const stripeCreateCheckoutSession = functions.https.onCall(async (data, context) => {
    const userID = assertUID(context);
    const priceID = assert(data, 'priceID')
    const hostURL = data.hostURL;
    return catchErrors(createCheckoutSession(userID, priceID, hostURL, ''));
});
