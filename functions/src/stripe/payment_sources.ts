import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from '../helpers';
import { stripe } from '../config';
import { getOrCreateCustomer } from './customers';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import Stripe from 'stripe';


/**
 * Attaches a payment source to a Stripe customer account if the payment source is not already attached.
 * @returns a StripeSource object if the customer exists or undefined if the customer is deleted
 */
export async function attachSource(userID: string, sourceID: string): Promise < StripeSource | undefined > {
    const customer = await getOrCreateCustomer(userID);
    if (customer.deleted) {
        return undefined;
    } else {
        const sources = customer.sources;
        if (sources) {
            const existingSource = sources.data.filter(source => source.id === sourceID).pop();
            if (existingSource) {
                return existingSource;
            } else {
                await stripe.customers.createSource(customer.id, { source: sourceID });
                return stripe.customers.update(customer.id, { default_source: sourceID });
            }
        }
        await stripe.customers.createSource(customer.id, { source: sourceID });
        return stripe.customers.update(customer.id, { default_source: sourceID });
    }
}

type StripeSource =
    Stripe.Customer |
    Stripe.AccountDebitSource |
    Stripe.AlipayAccount |
    Stripe.BankAccount |
    Stripe.BitcoinReceiver |
    Stripe.Card |
    Stripe.Source;


/////// CLOUD FUNCTIONS ////////

/**
 * Attach a stripe source to the authorized User
 */
export const stripeAttachSource = functions.https.onCall(async (data, context: CallableContext) => {
    const userID = assertUID(context);
    const sourceID = assert(data, 'source');
    return catchErrors(attachSource(userID, sourceID));
});
