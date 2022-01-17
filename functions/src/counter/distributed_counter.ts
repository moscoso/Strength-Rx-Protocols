import * as admin from 'firebase-admin';
import { db } from '../config';

const NUMBER_OF_SHARDS = 5;
const COUNTER_COLLECTION = `counters`;

/**
 * Creates a distributed counter using shards. https://firebase.google.com/docs/firestore/solutions/counters
 * @param name the name of the distributed counter
 */
export async function createCounter(name: string): Promise < FirebaseFirestore.WriteResult[] > {
    const ref = db.collection(COUNTER_COLLECTION).doc(name);
    const batch = db.batch();
    // Initialize the counter document
    batch.set(ref, { 'number_of_shards': NUMBER_OF_SHARDS });
    for (let i = 0; i < NUMBER_OF_SHARDS; i++) {
        const shardRef = ref.collection('shards').doc(i.toString());
        batch.set(shardRef, { count: 0 });
    }

    // Commit the write batch
    return batch.commit();
}

/**
 * Increment the distributed counter by incrementing one of the shards randomly.
 * @param name the name of the distributed counter
 * @param transaction a running firestore transaction to operate within
 */
export async function incrementCounter(name: string, transaction: FirebaseFirestore.Transaction): Promise < FirebaseFirestore.Transaction > {
    const ref = db.collection(COUNTER_COLLECTION).doc(name);
    // Select a shard of the counter at random
    const randomShardID: string = Math.floor(Math.random() * NUMBER_OF_SHARDS).toString();
    const shardRef = ref.collection('shards').doc(randomShardID);

    // Update count
    return transaction.update(shardRef, 'count', admin.firestore.FieldValue.increment(1));
}

/**
 * Gets the number of clients from the distributed counter
 */
export async function getCount(name: string): Promise < number > {
    const ref = db.collection(COUNTER_COLLECTION).doc(name);
    const snapshot: FirebaseFirestore.DocumentSnapshot = await ref.get();
    if (snapshot.exists) {
        // Sum the count of each shard in the subcollection
        return ref.collection('shards').get().then((shard) => {
            let totalCount = 0;
            shard.forEach((doc) => {
                totalCount += doc.data().count;
            });

            return totalCount;
        });
    } else {
        await createCounter(name);
        return getCount(name);
    }
}