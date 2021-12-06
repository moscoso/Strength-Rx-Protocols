import { db, auth } from '../config';
import { assert, catchErrors } from '../helpers';
import * as functions from 'firebase-functions';

export async function getProfileData(userID: string): Promise <FirebaseFirestore.DocumentData | undefined> {
    return (await db.doc(`profiles/${userID}`).get()).data();
}

async function createUserAndSetProfile(profile: any, password: string): Promise<FirebaseFirestore.WriteResult> {
    return auth.createUser({'email': profile.email, password}).then(authorizedUser => {
        profile.id = authorizedUser.uid;
        return db.collection(`profiles`).doc(authorizedUser.uid).set(profile);
    });
}

export const createUserAndProfile = functions.https.onCall(async (data, context) => {
    const profile = assert(data, 'profile');
    const password = assert(data, 'password');

    return catchErrors(createUserAndSetProfile(profile, password));
});

export const getUserData = getProfileData;