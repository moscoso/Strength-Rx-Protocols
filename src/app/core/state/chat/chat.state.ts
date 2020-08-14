import { Timestamp } from 'src/util/timestamp/timestamp';
import { EntityState } from '@ngrx/entity';

/**
 * Messages are represented by an EntityState that
 * includes a dictionary of messages and the
 * list of ids that corresponds to each messages
 */
export interface ChatState extends EntityState < Message > {
    conversationList: Conversation[];
    requestInProgress: boolean;
    error: any | null;
}

export interface Conversation {
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
    timestamp: Timestamp;
}


