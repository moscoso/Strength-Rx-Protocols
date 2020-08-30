import { db } from '../config';

export async function getProfileData(userID: string): Promise <any> {
    const profileDoc = await db.doc(`profiles/${userID}`).get();
    if(profileDoc === undefined) {
        const errorMessage = `Profile document for ${userID} did not exist`;
        throw new Error(errorMessage);
    }
    return profileDoc.data()
}

export const getUserData = getProfileData;