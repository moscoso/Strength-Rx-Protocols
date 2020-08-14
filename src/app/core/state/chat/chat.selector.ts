
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { chatAdapter } from './chat.reducer';
import { ChatState } from './chat.state';



/**
 * Gets the top-level state property named 'chats' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const selectState = createFeatureSelector < ChatState > ('chat');
export const {
    // selectIds,
    // selectEntities,
    selectAll,
    // selectTotal,
} = chatAdapter.getSelectors(selectState);

/**
 * Select a message by ID
 * @param messageID the ID of the message
 */
export const selectMessageByID = (messageID: string) => createSelector(
    selectState,
    (state: ChatState) => state.entities[messageID]
);

/**
 * Select a boolean that represents a Request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ChatState) => state.requestInProgress
);
