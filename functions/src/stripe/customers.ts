import { assert } from '../helpers';
import { db, stripe, STRIPE_COLLECTION } from '../config';
import Stripe from 'stripe';
import admin = require('firebase-admin');

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
 * Gets a customer ID that corresponds to a User from Firebase to be used for the Stripe API
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
    const user = await admin.auth().getUser(userID);
    const customer: Stripe.Customer = await stripe.customers.create({
        email: user.email,
        metadata: { firebaseUserID: userID }
    })
    await updateUser(userID, { 'stripeCustomerID': customer.id, email: user.email })
    return customer;
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
