import * as functions from 'firebase-functions';
import { auth } from '../config/index';

/**
 * Change the user's password
 * @param currentPassword 
 * @param newPassword 
 * @param confirmNewPassword 
 */
export const change_password = functions.https.onCall(async (data, context) => {
	return auth.createUser({'email': profile.email, password}).then(authorizedUser => {
        profile.id = authorizedUser.uid;
        return db.collection(`profiles`).doc(authorizedUser.uid).set(profile);
    });

	// return catchErrors(createUserAndSetProfile(profile, password));
});
