import { ChatAction, ChatActionType } from './chat.actions';
import { chatAdapter, ChatState, CHAT_INIT_STATE } from './chat.state';

export function chatReducer(state: ChatState = CHAT_INIT_STATE, action: ChatAction): ChatState {
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
