// Initialize Firebase Admin SDK
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// Set Firestore settings
export const db = admin.firestore();
const settings: FirebaseFirestore.Settings = { timestampsInSnapshots: true};
db.settings(settings);

// ENV Variables
export const stripeSecret = functions.config().stripe.secret;

// Initialize Stripe
import Stripe from 'stripe';
export const stripe = new Stripe(stripeSecret, {apiVersion: '2020-03-02'});
