// Initialize Firebase Admin SDK
import {initializeApp} from 'firebase-admin/app';
initializeApp();

/** The Firebase Admin's Auth instance */
import {getAuth} from 'firebase-admin/auth';
export const auth = getAuth();

/** The Firebase Admin's Firestore database instance */
import {getFirestore} from 'firebase-admin/firestore';
export const db: FirebaseFirestore.Firestore = getFirestore();
const settings: FirebaseFirestore.Settings = { timestampsInSnapshots: true};
db.settings(settings);

/** The Firebase Admin's Messaging instance */
import {getMessaging} from 'firebase-admin/messaging';
export const messaging = getMessaging();

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