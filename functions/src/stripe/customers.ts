import { assert } from '../helpers';
import { db, stripe, STRIPE_COLLECTION } from '../config';
import Stripe from 'stripe';

/**
 * Read the user's document from Firestore that defines Stripe data
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
 * Gets a customer object from Firebase to be used for the Stripe API
 * @param userID the ID corresponding to the user
 */
export async function getCustomer(userID: string): Promise < FirebaseFirestore.DocumentData | undefined >  {
    const user = await getUser(userID);
    return assert(user, 'stripeCustomerID');
}

/**
 * Takes a Firebase user and creates a Stripe customer account
 * @param userID the ID corresponding to the user
 */
export async function createCustomer(userID: any): Promise < Stripe.Customer > {
    const customer: Stripe.Customer = await stripe.customers.create({
        metadata: { firebaseUserID: userID }
    })
    await updateUser(userID, { 'stripeCustomerID': customer.id })
    return customer;
}

/**
 * Read the stripe customer ID from firestore, or create a new one if missing
 * @param userID the ID corresponding to the user
 */
export async function getOrCreateCustomer(userID: string) {
    const user = await getUser(userID);
    const customerID = user && user.stripeCustomerID;
    // If missing customerID, create it
    if (!customerID) {
        return createCustomer(userID);
    } else {
        return stripe.customers.retrieve(customerID);
    }
}
