import { db, auth, STRIPE_COLLECTION } from '../config';
import Stripe from 'stripe';
import { getCount, incrementCounter } from '../counter/distributed_counter';
// tslint:disable-next-line: no-implicit-dependencies
import { Transaction, DocumentReference } from '@google-cloud/firestore';
import * as functions from 'firebase-functions';
import * as dayjs from 'dayjs';

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
    return db.doc(`${STRIPE_COLLECTION}/${userID}`).set({ status }, { 'merge': true });
}

export const updateMembershipStatus = functions.firestore.document(`${STRIPE_COLLECTION}/{userID}/subscriptions/{docID}`)
    .onWrite(async (change, context) => {
        const userID = context.params.userID;
        const subscription = change.after.data();
        if (subscription) {
            return updateClient(userID, subscription.status);
        } else {
            throw new Error(`Could not update membership for ${userID}`)
        }
    })


async function createClientEvent(clientID: string, timestamp: FirebaseFirestore.Timestamp, eventType: string, docID: string) {
    const clientData = (await db.doc(`clients/${clientID}`).get()).data();

    if (clientData === null || clientData === undefined) {
        const errorMessage = `Event creation failed because client Data does not exist for ${clientID}`
        throw new Error(errorMessage);
    } else {
        return db.collection('events').add({
            'userID': clientID,
            'firstName': clientData.firstName,
            'timestamp': timestamp,
            'docID': docID,
            'type': eventType,
            'trainerID': clientData.assignedTrainer ? clientData.assignedTrainer.id : '',
        });
    }
}

export const onCreatedClient = functions.firestore.document(`clients/{clientID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const userID = change.data().userID;
    const clientID = context.params.clientID;
    return createClientEvent(userID, createTime, 'started-membership', clientID)
});


export const onWrittenClient = functions.firestore.document(`clients/{clientID}`).onWrite(async (change, context) => {
    const clientID = context.params.clientID;
    const data = change.after.data();
    if (data) {
        const assignedProgram = data.assignedProgram;
        if (assignedProgram) {
            const calendar = buildCalendar(assignedProgram);
            return db.doc(`clients/${clientID}/calendar/calendar`).set({
                calendar
            });
        } else {
            return db.doc(`clients/${clientID}/calendar/calendar`).delete();
        }
    } 
    throw new functions.https.HttpsError('failed-precondition', `data does not exist for clientID ${clientID}`);
});

function buildCalendar(program: Program): any {
    const calendar: any = {};
    const startDay: dayjs.Dayjs = dayjs(new Date());// dayjs(program.startDate);
    program.phases.forEach((phase, phaseIndex) => {
        let normalizedWeekIndex = 0;
        for (let i = 1; i <= phase.lengthInWeeks; i++) {
            Object.keys(phase.schedule).sort().forEach((day, dayIndex) => {
                const workout = phase.schedule[day];
                if (workout) {
                    const DAYS_IN_A_WEEK = 7;
                    const adjustment = dayIndex + (normalizedWeekIndex * DAYS_IN_A_WEEK)
                    const assignedDay = dayjs(startDay).add(adjustment, 'day');
                    const dayID = assignedDay.format('MM-DD-YYYY');
                    const event = buildWorkoutEvent(dayID, assignedDay.toDate(), workout, phaseIndex, i,
                        normalizedWeekIndex + 1)
                    calendar[dayID] = event;
                }
            });
            normalizedWeekIndex++;
        }
    });
    return calendar;
}

function buildWorkoutEvent(
    id: string,
    assignedDate: Date,
    workout: Workout,
    phase: number,
    week: number,
    normalizedWeek: number
): WorkoutEvent {
    assignedDate.getTime()
    return {
        id,
        'assignedDate': assignedDate.getTime(),
        workout,
        phase,
        week,
        normalizedWeek,
        completed: null,
    }
}


export const onCreatedCheckIn = functions.firestore.document(`check-ins/{docID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const userID = change.data().userID;
    const docID = context.params.docID;
    return createClientEvent(userID, createTime, 'check-in', docID)
});

export const onCreatedReview = functions.firestore.document(`clients/{clientID}/reviews/{docID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const clientID = context.params.clientID;
    const docID = context.params.docID;
    return createClientEvent(clientID, createTime, 'review', docID);
});

export const onCreatedProgressPics = functions.firestore.document(`clients/{clientID}/progress-pics/{docID}`).onCreate(async (change,
    context) => {
    const createTime = change.createTime;
    const clientID = context.params.clientID;
    const docID = context.params.docID;
    return createClientEvent(clientID, createTime, 'progress-pic', docID);
});


interface Program {
    id: string;
    name: string;
    totalLengthInWeeks: number;
    phases: ProgramPhase[];
    photoURL: string;
    startDate: Date;
    dateCreated: Date;
}

/**
 * A distinct stage in a training Program.
 * Each phase is broken up into a weekly schedule and each phase typically lasts for several weeks.
 */
interface ProgramPhase {
    name: string;
    schedule: WorkoutSchedule;
    lengthInWeeks: number;
}

/**
 * Initialize a Program Phase with default values
 */
// const INIT_PROGRAM_PHASE: ProgramPhase = {
//     'name': 'unnamed phase',
//     'lengthInWeeks': 1,
//     'schedule': {
//         'day1': null,
//         'day2': null,
//         'day3': null,
//         'day4': null,
//         'day5': null,
//         'day6': null,
//         'day7': null,
//     },
// };

/**
 * The workout schedule for a week of a Program's phase
 */
type WorkoutSchedule = any


/**
 * The main data model for an Workout
 */
interface Workout {
    /**
     * The unique identifier for a workout
     */
    id: string;
    /**
     * The name of the workout
     */
    name: string;
    /**
     * A standard phase of a workout describes a normal exercise routine.
     *
     * Note: A value of Null indicates that this workout does not include a StandardPhase
     */
    standardPhase: any | null;
    /**
     * An interval phase describes an interval training routine.
     *
     * Note: A value of Null indicates that this workout does not include a IntervalPhase
     */
    intervalPhase: any | null;
    photoURL: string;
    /**
     * A timestamp denoting when this workout was created
     */
    dateCreated: Date;
}


interface WorkoutEvent {
    'id': string;
    'assignedDate': any;
    'workout': Workout;
    'completed': any | null;
    'phase': number;
    'week': number;
    'normalizedWeek': number;
}
