import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

/** 
 * Validates a data payload object of a Firebase Functions callable function
 * The assertion fails and throws an error when a specified key is missing from the data object
 */
export function assert(data: any, key: string) {
    if (data[key]) {
        return data[key];
    } else {
        throw new functions.https.HttpsError('invalid-argument', `function called without ${key} data`);
    }
}

/**
 * Validates auth context for callable function. 
 * The assertion fails and throws an error when the function is called by an unauthorized user
 * @returns the unique ID corresponding to the the authorized user
 */
export function assertUID(context: CallableContext): string {
    const loggedInUser = context.auth;
    if (loggedInUser) {
        return loggedInUser.uid;
    } else {
        throw new functions.https.HttpsError('permission-denied', 'function called without context.auth');
    }
}

/**
 * Sends a descriptive error response to the client when running a callable function
 * 
 * Without this, we would just be throwing internal errors in the Cloud Functions log which isn't very helpful.
 */
export async function catchErrors(promise: Promise < any > ): Promise < any > {
    try {
        return await promise;
    } catch (err) {
        throw new functions.https.HttpsError('unknown', err)
    }
}
