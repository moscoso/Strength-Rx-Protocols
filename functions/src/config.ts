// Initialize Firebase Admin SDK
import * as admin from 'firebase-admin';
admin.initializeApp();

/** The Firebase Admin's Firestore database instance */
export const db = admin.firestore();
/** The Firebase Admin's Auth instance */
export const auth = admin.auth();
/** The Firebase Admin's Messaging instance */
export const messaging = admin.messaging();
const settings: FirebaseFirestore.Settings = { timestampsInSnapshots: true};
db.settings(settings);

// Initialize ENV Variables for Firebase Functions
import * as functions from 'firebase-functions';
export const stripeSecret = functions.config().stripe.secret;
export const stripeWebhookSignature = functions.config().stripe.webhook_signature;
export const stripeCreateSubscriptionSignature = functions.config().stripe.scss;

// Initialize Stripe
import Stripe from 'stripe';
export const stripe = new Stripe(stripeSecret, {'apiVersion': '2020-08-27'});

//Set Collection names
export const STRIPE_COLLECTION = `accounts`;