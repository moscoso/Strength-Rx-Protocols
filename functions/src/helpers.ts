import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

/**
 * Validates that a key-value pair exists in the data payload
 * 
 * @param data the data payload to verified
 * @param key the variable name of the key-value pair to validate
 * 
 * @throws an `invalid-argument` error when a specified key is missing from the `data` object
 */
export function assert(data: any, key: string) {
    if (data[key]) {
        return data[key];
    } else {
        throw new functions.https.HttpsError('invalid-argument', `function called without ${key} data`);
    }
}

/**
 * Validates the auth context of the callable function. In other words, the user calling this function must be authorized.
 * 
 * @param context the callable context
 * 
 * @returns the unique ID corresponding to the the authorized user
 * 
 * @throws an error when the function is called by an unauthorized user
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
 * Sends a descriptive error response to the caller of this callable function
 * 
 * Without this, we would just be throwing internal errors in the Cloud Functions log which isn't very helpful.
 */
export async function catchErrors(promise: Promise < any > ): Promise < any > {
    try {
        return await promise;
    } catch (err: any) {
		if(err.code) {
			throw err
		} else {
			throw new functions.https.HttpsError('unknown', err);
		} 
    }
}