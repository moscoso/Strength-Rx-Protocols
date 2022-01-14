import * as functions from 'firebase-functions';
import { auth } from '../config';

/**
 * Change the user's password
 * @param currentPassword 
 * @param newPassword 
 * @param confirmNewPassword 
 */
export const change_password = functions.https.onCall(async (data, context) => {
	return auth.createUser({'email': data.profile.email, 'password': data.password}).then(authorizedUser => {
        data.profile.id = authorizedUser.uid;
		return auth.generatePasswordResetLink(data.profile.email);
    });
});

