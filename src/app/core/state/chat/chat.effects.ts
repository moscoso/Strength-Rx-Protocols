import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ChatAction, ChatActionType} from './chat.actions';
import * as ChatActions from './chat.actions';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ChatService } from '../../firebase/chat/chat.service';
import { Conversation, Message } from './chat.model';

@Injectable()
export class ChatEffects {

    @Effect({'dispatch': false}) error$: Observable<ChatAction> = this.actions$.pipe(
        ofType(ChatActionType.RequestFailed),
        tap((action: ChatActions.RequestFailed) => {
            this.toaster.failed('Request for chat failed', action.error);
        })
    );

    @Effect() conversationListRequested$: Observable < ChatAction > = this.actions$.pipe(
        ofType<ChatAction>(ChatActionType.ConversationListRequested),
        switchMap((action: ChatActions.ConversationListRequested) => {
            return from(this.chatService.requestConversationList(action.userID)
                .then((chats: Conversation[]) => new ChatActions.ConversationListLoaded(chats))
                .catch(error => new ChatActions.RequestFailed(error))
            );
        })
    );

    @Effect() messagesRequested$: Observable < ChatAction > = this.actions$.pipe(
        ofType<ChatAction>(ChatActionType.MessagesRequested),
        switchMap((action: ChatActions.MessagesRequested) => {
            return from(this.chatService.requestMessages(action.conversationID)
                .then(chats => new ChatActions.MessagesLoaded(chats))
                .catch(error => new ChatActions.RequestFailed(error))
            );
        })
    );

    @Effect() messageSent$: Observable < ChatAction > = this.actions$.pipe(
        ofType<ChatAction>(ChatActionType.SendMessageRequested),
        switchMap((action: ChatActions.SendMessageRequested) => {
            return from(this.chatService.sendMessage(action.message)
                .then((message: Message) => new ChatActions.MessageSent(message))
                .catch(error => new ChatActions.RequestFailed(error))
            );
        })
    );

    constructor(
        private chatService: ChatService,
        private actions$: Actions,
        private toaster: ToastService,
    ) {}
}
