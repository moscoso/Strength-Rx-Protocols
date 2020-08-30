import { db } from '../config';

/**
 * Get the Device Tokens for the given user.
 *
 * @param {string} userID The unique ID that corresponds to the recipient user.
 */
export async function getDeviceTokens(userID: string): Promise<any> {
    const tokens = (await db.doc(`/profiles/${userID}/tokens`).get()).data();
    if (tokens === undefined) {
        return [];
    } else {
        return Object.keys(tokens);
    }
}
