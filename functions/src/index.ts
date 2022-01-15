import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

export const testFunction = functions.https.onCall(async (data, context: CallableContext) => {
    const uid = context.auth && context.auth.uid;
    const message = data.message;

    return `${uid} sent a message of ${message}`;
});

export * as stripe from './stripe/index';
export { onCreatedCheckIn, onCreatedClient, onWrittenClient, onCreatedProgressPics, onCreatedReview, updateMembershipStatus } from './strengthrx/clients';
export { createEntity } from './strengthrx/entity';
export { onMessageCreated } from './strengthrx/chat';
export { createUserAndProfile } from './strengthrx/user';