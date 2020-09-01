import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

/**
 * Validates that a key-value pair exists in the data payload object of a Firebase Functions callable function
 * The assertion fails and throws an error when a specified key is missing from the data object
 * @param data the data passed through the callable function
 * @param key the variable name of the key-value pair to validate
 */
export function assert(data: any, key: string) {
    if (data[key]) {
        return data[key];
    } else {
        throw new functions.https.HttpsError('invalid-argument', `function called without ${key} data`);
    }
}

/**
 * Validates auth context for callable function, i.e the user calling this function must be authorized
 * The assertion fails and throws an error when the function is called by an unauthorized user
 * @returns the unique ID corresponding to the the authorized user
 */
export function assertUID(context: CallableContext): string {
    const userIsAuthorized = context.auth;
    if (userIsAuthorized) {
        return userIsAuthorized.uid;
    } else {
        throw new functions.https.HttpsError('permission-denied', 'The function must be called while authenticated!');
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
