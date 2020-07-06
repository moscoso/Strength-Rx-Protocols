import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

export const testFunction = functions.https.onCall(async (data, context: CallableContext) => {
    const uid = context.auth && context.auth.uid;
    const message = data.message;

    return `${uid} sent a message of ${message}`;
});