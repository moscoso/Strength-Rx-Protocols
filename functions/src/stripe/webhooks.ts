import { db, stripe, STRIPE_COLLECTION, stripeWebhookSignature } from '../config';
import * as functions from 'firebase-functions';

/**
 * This file contains webhooks called by Stripe that can be configured here: 
 * https://dashboard.stripe.com/webhooks
 */

export async function webhookHandler(data: any) {
    const customerID = data.customer;
    const subscriptionID = data.subscription;
    const customer = await stripe.customers.retrieve(customerID);

    if (customer.deleted) {
        throw new Error(`Cannot execute webhook because customer ${customerID} is deleted`)
    } else {
        const userID = customer.metadata.firebaseUID;
        const subscription = await stripe.subscriptions.retrieve(subscriptionID);
        const isActive = subscription.status === 'active';
        const docData: any = {
            [subscription.id]: subscription.status,
        }
        if (subscription.plan) {
            docData[subscription.plan.id] = isActive;
        }
        return await db.doc(`${STRIPE_COLLECTION}/${userID}`).set(docData, { merge: true });
    }
};

/////// DEPLOYABLE FUNCTIONS ////////
export const invoiceWebhookEndpoint = functions.https.onRequest(
    async (req, res) => {
        try {
            const sig = req.headers['stripe-signature'];
            if(sig === undefined){
                throw new Error(`Stripe signature was undefined`);
            }
            const event = stripe.webhooks.constructEvent(
                (req as any).rawBody,
                sig,
                stripeWebhookSignature
            );
            const data = event.data.object;
            await webhookHandler(data);
            res.sendStatus(200);
        } catch (err) {
            res.status(400).send(err);
        }
    }
);
