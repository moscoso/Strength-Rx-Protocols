import { db, auth } from '../config';
import Stripe from 'stripe';
import { getCount, incrementCounter } from '../counter/distributed_counter';
// tslint:disable-next-line: no-implicit-dependencies
import { Transaction, DocumentReference } from '@google-cloud/firestore';

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
        if (profile == null) {
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
