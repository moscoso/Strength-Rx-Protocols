import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';
import { Message } from '../../../state/chat/chat.model';

@Injectable({
    'providedIn': 'root'
})
export class ChatService {

    constructor(
        private auth: AngularFireAuth,
        private firestore: AngularFirestore
    ) {}

    getCurrentUser() {
        return this.auth.user;
    }

    calculateConversationID(user1: string, user2: string) {
        const firstID = user1 < user2 ? user1 : user2;
        const secondID = user1 >= user2 ? user1 : user2;
        return `${firstID}-${secondID}`;
    }

    getOtherIDFromConversationID(userID: string, conversationID: string) {
        const tokens = conversationID.split('-');
        const matches = tokens.filter(id => id !== userID);
        if (matches.length !== 1) {
            throw new Error(`getOtherIDFromConversationID failed because matches length does not equal 1`);
        } else {
            return matches[0];
        }
    }


    async sendMessage(message: Message): Promise < Message > {
        const doc = this.firestore.collection(`conversations/${message.conversationID}/messages`);
        return doc.add(message).then((x) => {
            x.update({ 'id': x.id });
            return { ...message, 'id': x.id };
        });
    }

    async requestMessages(conversationID: string): Promise < any[] > {
        return this.firestore.collection(`conversations/${conversationID}/messages`).valueChanges()
            .pipe(first()).toPromise();
    }

    async requestConversationList(userID: string): Promise < any[] > {
        const conversations = await this.firestore.collection(`conversations`, ref => ref.where('userIDs',
                'array-contains', userID))
            .get().pipe(first()).toPromise();
        return conversations.docs;
    }
}
