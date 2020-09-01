// Initialize Firebase Admin SDK
import * as admin from 'firebase-admin';
admin.initializeApp();

// Set Firestore settings
export const db = admin.firestore();
export const auth = admin.auth();
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
export const stripe = new Stripe(stripeSecret, {apiVersion: '2020-03-02'});

//Set Collection names
export const STRIPE_COLLECTION = `accounts`;