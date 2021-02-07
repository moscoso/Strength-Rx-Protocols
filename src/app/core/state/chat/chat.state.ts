import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Conversation, Message } from './chat.model';

export interface ChatState extends EntityState < Message > {
    conversationList: Conversation[];
    requestInProgress: boolean;
    error: any | null;
}

export const chatAdapter = createEntityAdapter < Message > ({
    'selectId': message => message.id,
    'sortComparer': sortByTimestamp,
});

export const CHAT_INIT_STATE: ChatState = chatAdapter.getInitialState({
    'conversationList': [],
    'requestInProgress': false,
    'error': null,
});



export function sortByTimestamp(a: Message, b: Message): number {
    const dateA = a.timestamp, dateB = b.timestamp;
    return dateA.toLocaleTimeString().localeCompare(dateB.toLocaleTimeString());
}
