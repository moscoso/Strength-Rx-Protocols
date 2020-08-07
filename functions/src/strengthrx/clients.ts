import { db, auth } from '../config';
import Stripe from 'stripe';
import { getCount, incrementCounter } from '../counter/distributed_counter';
// tslint:disable-next-line: no-implicit-dependencies
import { Transaction, DocumentReference } from '@google-cloud/firestore';
import * as functions from 'firebase-functions';

/**
 * Creates a Firebase document in the clients collection with 
 * @param userID the ID corresponding to the user
 * @param subscription the Subscription created to start a membership for the client 
 */
export async function createClient(userID: string, subscription: Stripe.Subscription) {
    const shortID: number = await getCount(`clients`) + 1;
    return db.runTransaction(async (transaction: Transaction) => {
        await incrementCounter(`clients`, transaction);
        const user = await auth.getUser(userID);
        const profile = (await db.collection(`profiles`).doc(userID).get()).data()
        if (profile === null || profile === undefined) {
            const errorMessage = `Could not create client because profile for ${userID} does not exist`
            throw new Error(errorMessage);
        }

        const clientRef: DocumentReference = db.doc(`clients/${userID}`);
        return transaction.set(clientRef, {
            ...profile,
            ...{
                userID,
                clientID: shortID,
                email: user.email,
                subscription: subscription.status,
            }
        });
    })
}

export const createEvent = functions.firestore.document(`check-ins/{docID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const userID = change.data().userID;

    const userData = (await db.doc(`clients/${userID}`).get()).data();

    if (userData === null || userData === undefined) {
        throw new Error(`Event creation failed because user Data does not exists`);
    } else {
        return db.collection('events').add({
            userID,
            'firstName': userData.firstName,
            'timestamp': createTime,
            'type': 'check-in',
            'trainerID': userData.assignedTrainer.id
        })
    }
})
