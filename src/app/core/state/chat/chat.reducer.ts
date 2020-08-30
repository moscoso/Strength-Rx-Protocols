import { ChatAction, ChatActionType } from './chat.actions';
import { ChatState, Message } from './chat.state';
import { createEntityAdapter } from '@ngrx/entity';

export const chatAdapter = createEntityAdapter < Message > ({
    'selectId': message => message.id,
    'sortComparer': sortByTimestamp,
});

export function sortByTimestamp(a: Message, b: Message): number {
    let dateA, dateB;
    if (typeof a.timestamp.toDate === 'function') {
        dateA = a.timestamp.toDate();
    } else {
        dateA = a.timestamp;
    }
    if (typeof b.timestamp.toDate === 'function') {
        dateB = b.timestamp.toDate();
    } else {
        dateB = b.timestamp;
    }
    return dateA.toLocaleTimeString().localeCompare(dateB.toLocaleTimeString());
}

const INIT_STATE: ChatState = chatAdapter.getInitialState({
    'conversationList': [],
    'requestInProgress': false,
    'error': null,
});


export function chatReducer(state: ChatState = INIT_STATE, action: ChatAction): ChatState {
    switch (action.type) {
        case ChatActionType.ConversationListRequested:
        case ChatActionType.MessagesRequested:
        case ChatActionType.SendMessageRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ChatActionType.ConversationListLoaded:
            return {
                ...state,
                'requestInProgress': false,
                'conversationList': action.conversationList
            };
        case ChatActionType.MessageSent:
            return chatAdapter.setOne(action.message, {
                ...state,
                'requestInProgress': false,
            });
        case ChatActionType.MessagesLoaded:
            return chatAdapter.setAll(action.messages, {
                ...state,
                'requestInProgress': false,
            });
        case ChatActionType.RequestFailed:
            return {
                ...state,
                'requestInProgress': false,
                'error': action.error
            };
        default:
            return state;
    }
}
