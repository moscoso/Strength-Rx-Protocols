import { UserInfo } from 'firebase';

export interface AuthState {
    /**
     * The ID that uniquely identifies the user
     */
    userID: string | null;
    /**
     * Represents a collection of standard User profile information
     * used by Firebase's authentication system
     */
    userData: UserData | null;

    /**
     * A flag indicating that the user is authenticating
     */
    isAuthenticated: boolean;

    /**
     * A flag indicated that an auth operation is in progress
     */
    isInProgress: boolean;

    /**
     * The error that caused any auth operation to fail
     */
    error ?: any;
}

export const AUTH_INIT_STATE: AuthState = {
    'userID': null,
    'userData': null,
    'isAuthenticated': false,
    'isInProgress': false,
    'error': null,
};

/**
 *  User profile information, visible only to the Firebase project's apps.
 *  https://firebase.google.com/docs/reference/node/firebase.UserInfo
 *
 *  Note: This is just a re-export of Firebase's UserInfo type.
 *  It is essential to this project's state management for auth
 */
export interface UserData extends UserInfo {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    /**
     * The user's unique ID.
     */
    uid: string;
}

