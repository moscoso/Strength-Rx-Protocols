import { assert } from '../helpers';
import { auth, db, stripe, STRIPE_COLLECTION } from '../config';
import Stripe from 'stripe';
import * as functions from 'firebase-functions';
import { getProfileData } from '../strengthrx/user';

/**
 * Read the user's account document from Firestore that defines Stripe data
 * @param userID the ID corresponding to the user
 */
export async function getUser(userID: string) {
    return await db.collection(STRIPE_COLLECTION).doc(userID).get().then(doc => doc.data());
}

/**
 * Updates the user document in Firestore non-destructively
 * @param userID the ID corresponding to the user
 * @param data a payload object to merge to the document
 */
export async function updateUser(userID: string, data: Object) {
    return await db.collection(STRIPE_COLLECTION).doc(userID).set(data, { merge: true })
}

/**
 * Gets a Customer ID provided by Stripe that corresponds to a User in Firebase.
 * This ID is to be used as the customer's indentifier with the Stripe API
 * @param userID the ID corresponding to the user
 */
export async function getCustomerID(userID: string): Promise < string >  {
    const user = await getUser(userID);
    return assert(user, 'stripeCustomerID');
}

/**
 * Takes a Firebase user and creates a Stripe customer account
 * @param userID the ID corresponding to the user
 */
export async function createCustomer(userID: string): Promise < Stripe.Customer > {
    const user = await auth.getUser(userID);
    const customer: Stripe.Customer = await stripe.customers.create({
        email: user.email,
        metadata: { firebaseUserID: userID }
    })
    await updateUser(userID, { 'stripeCustomerID': customer.id, email: user.email })
    return customer;
}

export async function updateCustomerName(userID: string): Promise < Stripe.Customer > {
    const customerID = await getCustomerID(userID); 
    const user = await getProfileData(userID);
    if(user) {
        const fullName = `${user.firstName} ${user.lastName}`;
        return stripe.customers.update(customerID, {'name': fullName})
    } else {
        throw new functions.https.HttpsError('aborted', `profile document for userID ${userID} was undefined`);
    }
    
}

/**
 * Retrieves the details of an existing customer ID from firestore, or create a new one if missing
 * @param userID the ID corresponding to the user of Firebase
 */
export async function getOrCreateCustomer(userID: string) {
    const user = await getUser(userID);
    if (user && user.stripeCustomerID) {
        const customerID = user.stripeCustomerID;
        return stripe.customers.retrieve(customerID);
    } else {
        return createCustomer(userID);
    }
}
