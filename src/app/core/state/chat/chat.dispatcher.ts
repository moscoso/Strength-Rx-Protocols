import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { MessagesRequested, SendMessageRequested } from './chat.actions';
import { Message } from './chat.state';
import { ProfileStoreDispatcher } from '../profile/profiles.dispatcher';
import { first } from 'rxjs/operators';
import { ChatService } from '../../firebase/chat/chat.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { StateModule } from '../state.module';
import { selectAll } from './chat.selector';
import { Observable } from 'rxjs';


/**
 * This service is responsible for dispatching Chat actions to the Store and selecting
 * chat data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class ChatStoreDispatcher {
    constructor(
        private store: Store < AppState > ,
        private profileService: ProfileStoreDispatcher,
        private chatService: ChatService,
    ) {}

    // public loadConversationList(userID: string) {
    //     this.store.dispatch(new ConversationListRequested(userID));
    // }

    public loadMessages(conversationID: string) {
        this.store.dispatch(new MessagesRequested(conversationID));
    }

    public selectMessages(): Observable <Message[]> {
        return this.store.select(selectAll);
    }

    public async sendMessage(conversationID: string, text: string) {
        const profile = await this.profileService.selectUserProfile().pipe(first()).toPromise();
        const message: Message = {
            'id': null,
            conversationID,
            'senderID': profile.id,
            'senderName': `${profile.firstName} ${profile.lastName}`,
            text,
            'timestamp': firebase.firestore.Timestamp.now()
        };
        this.store.dispatch(new SendMessageRequested(message));
    }

    public calculateConversationID(user1, user2) {
        return this.chatService.calculateConversationID(user1, user2);
    }

    public getOtherIDFromConversationID(userID: string, conversationID: string) {
        return this.chatService.getOtherIDFromConversationID(userID, conversationID);
    }
}
