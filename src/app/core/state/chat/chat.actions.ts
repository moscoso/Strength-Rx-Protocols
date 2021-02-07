import { Action } from '@ngrx/store';
import { Conversation, Message } from './chat.model';

export enum ChatActionType {
    ConversationListRequested = '[] Conversation List Requested',
    ConversationListLoaded = '[] Conversation List Loaded',
    MessagesRequested = '[Messages Requested] Conversation Requested',
    MessagesLoaded = '[Messages Loaded] All Messages Loaded',
    SendMessageRequested = '[] Assign Trainer to Client Requested',
    MessageSent = '[] Message Sent',
    // MessageReceived = '[] Message Received',
    RequestFailed = '[] Request Failed',
}

export class ConversationListRequested implements Action {
    readonly type = ChatActionType.ConversationListRequested;
    constructor(public userID: string) {}
}

export class ConversationListLoaded implements Action {
    readonly type = ChatActionType.ConversationListLoaded;
    constructor(
        public conversationList: Conversation[],
    ) {}
}

export class MessagesRequested implements Action {
    readonly type = ChatActionType.MessagesRequested;
    constructor(public conversationID: string) {}
}

export class MessagesLoaded implements Action {
    readonly type = ChatActionType.MessagesLoaded;
    constructor(public messages: Message[]) {}
}

export class SendMessageRequested implements Action {
    readonly type = ChatActionType.SendMessageRequested;
    constructor(public message: Message) {}
}

export class MessageSent implements Action {
    readonly type = ChatActionType.MessageSent;
    constructor(public message: Message) {}
}

// export class MessageReceived implements Action {
//     readonly type = ChatActionType.MessageReceived;
//     constructor() {}
// }

export class RequestFailed implements Action {
    readonly type = ChatActionType.RequestFailed;
    constructor(public error: any) {}
}


/**
 * All of the actions related to Chat
 */
export type ChatAction =
    ConversationListRequested |
    ConversationListLoaded |
    MessagesRequested |
    MessagesLoaded |
    SendMessageRequested |
    MessageSent |
    // MessageReceived |
    RequestFailed;


