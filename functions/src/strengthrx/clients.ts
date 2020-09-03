import { db, auth, STRIPE_COLLECTION } from '../config';
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

async function updateClient(userID: string, status: Stripe.Subscription) {
    return db.doc(`${STRIPE_COLLECTION}/${userID}`).set({status}, {'merge': true});
}

export const updateMembershipStatus = functions.firestore.document(`${STRIPE_COLLECTION}/{userID}/subscriptions/{docID}`)
    .onWrite(async (change, context) => {
        const userID = context.params.userID;
        const subscription = change.after.data();
        if(subscription){
            return updateClient(userID, subscription.status);
        }else {
            throw new Error(`Could not update membership for ${userID}`)
        }
    })


async function createClientEvent(clientID: string, timestamp: FirebaseFirestore.Timestamp, eventType: string) {
    const clientData = (await db.doc(`clients/${clientID}`).get()).data();

    if (clientData === null || clientData === undefined) {
        const errorMessage = `Event creation failed because client Data does not exist for ${clientID}`
        throw new Error(errorMessage);
    } else {
        return db.collection('events').add({
            userID: clientID,
            'firstName': clientData.firstName,
            'timestamp': timestamp,
            'type': 'review',
            'trainerID': clientData.assignedTrainer.id
        })
    }
}

export const onCreatedClient = functions.firestore.document(`clients/{clientID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const userID = change.data().userID;
    return createClientEvent(userID, createTime, 'started-membership')
});


export const onCreatedCheckIn = functions.firestore.document(`check-ins/{docID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const userID = change.data().userID;
    return createClientEvent(userID, createTime, 'check-in')
});

export const onCreatedReview = functions.firestore.document(`clients/{clientID}/reviews/{docID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const clientID = context.params.clientID;
    return createClientEvent(clientID, createTime, 'review');
});

export const onCreatedProgressPics = functions.firestore.document(`clients/{clientID}/progress-pics/{docID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const clientID = context.params.clientID;
    return createClientEvent(clientID, createTime, 'progress-pic');
});
