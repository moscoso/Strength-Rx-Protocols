
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { chatAdapter, ChatState } from './chat.state';



/**
 * Selects the top-level state property 'chat' of the store tree.
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
 * @param messageID the unique identifier of the message
 */
export const selectMessageByID = (messageID: string) => createSelector(
    selectState,
    (state: ChatState) => state.entities[messageID]
);

/**
 * Select a flag that indicates a request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ChatState) => state.requestInProgress
);
