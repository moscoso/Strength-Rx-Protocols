import { getDeviceTokens } from './fcmUtility';
import { messaging } from '../config';

/**
 * Sends a message notification via FCM to the given user.
 *
 * @param {string} userID The unique ID that corresponds to the recipient user.
 * @param {string} userLanguage The user language in language-country format.
 */
export async function sendMessageNotification(userID: string, message: any) {
    // Fetching all the user's device tokens.
    const tokens = await getDeviceTokens(userID);
    if (tokens.length > 0) {
        // Notification details.
        const payload = {
            notification: {
                title: `You got a message`,
                body: `${message.text}`
            }
        };

        // Send notifications to all tokens.
        return messaging.sendToDevice(tokens, payload);
    }
    return null;
}
