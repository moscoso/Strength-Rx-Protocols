import * as functions from 'firebase-functions';
import { stripe } from '../config';
import Stripe from 'stripe';
import { getOrCreateCustomer } from './customers';
import { assertUID, catchErrors, assert } from '../helpers';

async function createCheckoutSession(userID: string, priceID: string, idempotencyKey: string) {
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
        success_url: 'http://localhost:8100/thank-you',
        cancel_url: 'http://localhost:8100/start-membership',
    }
    // const options: Stripe.RequestOptions = { idempotencyKey }
    const session = await stripe.checkout.sessions.create(params);
    return session;
}

export const stripeCreateCheckoutSession = functions.https.onCall(async (data, context) => {
    const userID = assertUID(context);
    const priceID = assert(data, 'priceID')
    // const returnURL = assert(data, 'returnURL');
    return catchErrors(createCheckoutSession(userID, priceID, ''));
});
