
/**
 * Find the ID belonging to the other user in a conversation, given a userID and a conversation ID.
 * It throws an error if the conversation ID is invalid or the provided userID is not contained within the conversation ID
 * @param userID one of the user ID's found in the conversation ID
 * @param conversationID a string that matches the pattern of two IDs seperated by a hypen. For example: `userA-userB`
 */
export function getOtherIDFromConversationID(userID: string, conversationID: string) {
    if (conversationID.indexOf('-') === -1) { throw new Error(`Invalid conversation ID`); }
    if (conversationID.indexOf(userID) === -1) { throw new Error(`User ID not found within conversation ID`); }
    return getOtherIDFromIDList(userID, getIDListFromConversationID(conversationID));
}

/**
 * Given a list of two IDs and a userID, return the other ID.
 * Fails if the list of matches does not equal 1.
 * @param userID one of the user ID's found in the listOfIDs
 * @param listOfIDs an array of strings representing IDs
 */
export function getOtherIDFromIDList(userID: string, listOfIDs: string[]): string {
    const matches = listOfIDs.filter(id => id !== userID);
    if (matches.length !== 1) {
        throw new Error(`getOtherIDFromIDList failed because matches length does not equal 1`);
    } else {
        return matches[0];
    }
}

/**
 * Get an array of strings that correspond to the user IDs that are contained within a conversation ID
 * @param conversationID a string that matches the pattern of two IDs seperated by a hypen. For example: `userA-userB`
 */
export function getIDListFromConversationID(conversationID: string): string[] {
    return conversationID.split('-');
}
