import { db } from '../config';
import * as functions from 'firebase-functions';
import { assertUID, assert } from '../helpers';

export const createEntity = functions.https.onCall(async (data, context) => {
    const userID = assertUID(context);
    const entity = assert(data, 'entity');
    console.log(entity);
    const collection = assert(data, 'collection');
    const docID = assert(data, 'docID');
    return db.collection(collection).doc(docID).set({id: userID, ...entity})
})
