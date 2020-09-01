import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

export const testFunction = functions.https.onCall(async (data, context: CallableContext) => {
    const uid = context.auth && context.auth.uid;
    const message = data.message;

    return `${uid} sent a message of ${message}`;
});

export { stripeAttachSource } from './stripe/payment_sources';
export { stripeCreateBillingPortalLink} from './stripe/billing'
export { stripeCreateCharge, stripeGetCharges } from './stripe/charges';
export { stripeCreateSubscription, stripeGetSubscriptions, stripeCancelSubscription } from './stripe/subscriptions';
export { invoiceWebhookEndpoint } from './stripe/webhooks';
export { createEvent } from './strengthrx/clients';
export { createEntity } from './strengthrx/entity';
export { onMessageCreated } from './strengthrx/chat';