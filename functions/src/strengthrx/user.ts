import { db } from '../config';

export async function getProfileData(userID: string): Promise <FirebaseFirestore.DocumentData | undefined> {
    return (await db.doc(`profiles/${userID}`).get()).data();
}

export const getUserData = getProfileData;