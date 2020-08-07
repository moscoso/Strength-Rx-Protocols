import { db } from '../config';
import * as functions from 'firebase-functions';
import { assertUID, assert } from '../helpers';

export const createEntity = functions.https.onCall(async (data, context) => {
    const userID = assertUID(context);
    const entity = assert(data, 'entity');
    const collection = assert(data, 'collection');
    return db.collection(collection).add({id: userID, ...entity})
})
