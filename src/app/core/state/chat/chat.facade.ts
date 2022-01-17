import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { MessagesRequested, SendMessageRequested } from './chat.actions';
import { Message } from './chat.model';
import { ProfileFacade } from '../profile/profile.facade';
import { first } from 'rxjs/operators';
import { ChatService } from '../../firebase/auth/chat/chat.service';
import { StateModule } from '../state.module';
import { selectAll } from './chat.selector';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getOtherIDFromConversationID } from 'src/util/chat/ConversationHelpers';


/**
 * This service is responsible for dispatching actions to the Store
 * and selecting data from the Store related to Chat
 */
@Injectable({ 'providedIn': StateModule })
export class ChatFacade {
    constructor(
        private store: Store < AppState > ,
        private profileService: ProfileFacade,
        private chatService: ChatService,
        private firestore: AngularFirestore
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

    public selectScuffedMessages(conversationID): Observable<any[]> {
        return this.firestore.collection(`conversations/${conversationID}/messages`).valueChanges();
    }

    public async sendMessage(conversationID: string, text: string) {
        const profile = await this.profileService.selectUserAsProfile().pipe(first()).toPromise();
        const message: Message = {
            'id': null,
            conversationID,
            'senderID': profile.id,
            'senderName': `${profile.firstName} ${profile.lastName}`,
            text,
            'timestamp': new Date()
        };
        this.store.dispatch(new SendMessageRequested(message));
    }

    public calculateConversationID(user1, user2) {
        return this.chatService.calculateConversationID(user1, user2);
    }

    public getOtherIDFromConversationID(userID: string, conversationID: string) {
        return getOtherIDFromConversationID(userID, conversationID);
    }
}
