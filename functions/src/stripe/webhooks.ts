import { stripe, stripeWebhookSignature, stripeCreateSubscriptionSignature } from '../config';
import * as functions from 'firebase-functions';
import { updateSubscription, activateSubscription } from './subscriptions';
import { createClient } from '../strengthrx/clients';

/**
 * This file contains webhooks called by Stripe that can be configured here: 
 * https://dashboard.stripe.com/webhooks
 */

export async function webhookHandler(data: any): Promise<FirebaseFirestore.WriteResult> {
    const customerID = data.customer;
    const subscriptionID = data.subscription;
    const customer = await stripe.customers.retrieve(customerID);

    if (customer.deleted) {
        throw new Error(`Cannot execute webhook because customer ${customerID} is deleted`)
    } else {
        const userID = customer.metadata.firebaseUID;
        const subscription = await stripe.subscriptions.retrieve(subscriptionID);
        return await updateSubscription(userID, subscription)
    }
};

export async function subscriptionCreatedHandler(data: any): Promise<FirebaseFirestore.WriteResult> {
    console.log(data);
    const customerID = data.customer;
    const subscriptionID = data.subscription;
    const customer = await stripe.customers.retrieve(customerID);

    if (customer.deleted) {
        throw new Error(`Cannot execute webhook because customer ${customerID} is deleted`)
    } else {
        const userID = customer.metadata.firebaseUID;
        const subscription = await stripe.subscriptions.retrieve(subscriptionID);
        await createClient(userID, subscription);
        if(subscription.plan === null) {throw new Error(`Subscription plan was null`)}
        return await activateSubscription(userID, subscription.plan.id, subscription.id)
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

export const subscriptionCreatedWebhook = functions.https.onRequest(
    async (req, res) => {
        console.log(`Subscription Created Invoked`);
        try {
            const sig = req.headers['stripe-signature'];
            if(sig === undefined){
                throw new Error(`Stripe signature was undefined`);
            }
            const event = stripe.webhooks.constructEvent(
                (req as any).rawBody,
                sig,
                stripeCreateSubscriptionSignature
            );
            const data = event.data.object;
            subscriptionCreatedHandler(data).then(() => {
                res.sendStatus(200);
            }).catch((reason)=> {
                res.status(400).send(reason);
            });
            
        } catch (err) {
            console.error(err);
            
        }
    }
);
