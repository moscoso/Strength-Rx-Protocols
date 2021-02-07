/**
 * A Conversation is a snapshot  of messages
 */
export interface Conversation {
    id: string;
    user1: string;
    user2: string;
    latest: Date;
    lastReadByUser1: Date;
    lastReadByUser2: Date;
    preview: string;
    userIDs: [];
    name1: string;
    name2: string;
    error?: any;
}

export interface Message {
    id: string | null;
    conversationID: string;
    // imageURL: string;
    // profilePhoto: string;
    senderID: string;
    senderName: string;
    text: string;
    timestamp: Date;
}
