import { db } from '../config';

/**
 * Get the Device Tokens for the given user.
 *
 * @param {string} userID The unique ID that corresponds to the recipient user.
 */
export async function getDeviceTokens(userID: string): Promise<string[]> {
    const tokens = (await db.collection(`/profiles/${userID}/tokens`).get());
    if (tokens === undefined) {
        return [];
    } else {
        return Object.keys(tokens);
    }
}
