import * as functions from 'firebase-functions';
import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { db } from '../config';
import { getProfileData } from './user';
import { sendMessageNotification } from '../notification/notification';
import { getOtherIDFromConversationID, getIDListFromConversationID } from './ConversationHelpers';

export const onMessageCreated = functions.firestore.document(`conversations/{conversationID}/messages/{messageID}`)
    .onCreate(async (snapshot: QueryDocumentSnapshot, context: functions.EventContext) => {
        const conversationID = context.params['conversationID'];
        const message = snapshot.data();
        const conversationDoc = await db.doc(`conversations/${conversationID}`).get();
        if (conversationDoc.data()) {
            await updateConversationDocument(conversationID, message);
        } else {
            await createConversationDocument(conversationID, message);
        }
        const senderID = message.senderID;
        const recepientID = getOtherIDFromConversationID(senderID, conversationID);
        return sendMessageNotification(recepientID, message)
    });


async function createConversationDocument(conversationID: string, message: any): Promise < any > {
    const userIDs = getIDListFromConversationID(conversationID);
    const user1 = userIDs[0];
    const user2 = userIDs[1];
    const userData1 = await getProfileData(user1);
    const userData2 = await getProfileData(user2);

    const name1 =  userData1 ? userData1.firstName : '';
    const name2 =  userData2 ? userData2.firstName : '';

    const conversation = {
        user1,
        user2,
        latest: message.timestamp,
        lastReadByUser1: message.senderID === user1 ? message.timestamp : null,
        lastReadByUser2: message.senderID === user2 ? message.timestamp : null,
        preview: message.text,
        userIDs,
        name1,
        name2
    }
    return db.doc(`conversations/${conversationID}`).set(conversation);
}

function updateConversationDocument(conversationID: string, message: any): Promise < FirebaseFirestore.WriteResult > {
    const userIDs = getIDListFromConversationID(conversationID);
    const user1 = userIDs[0];
    const user2 = userIDs[1];
    const conversation = {
        latest: message.timestamp,
        lastReadByUser1: message.senderID === user1 ? message.timestamp : null,
        lastReadByUser2: message.senderID === user2 ? message.timestamp : null,
        preview: message.text
    }
    return db.doc(`conversations/${conversationID}`).set(conversation, {'merge': true});
}
