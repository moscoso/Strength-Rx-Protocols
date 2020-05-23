import { UserInfo as FirebaseUserInfo } from 'firebase';

export interface AuthState {
    /**
     * The ID that uniquely identifies the user
     */
    userID: string | null;
    /**
     * Represents a collection of standard User profile information
     * used by Firebase's authentication system
     */
    userData: UserInfo | null;

    /**
     * The credential Firebase gives when a User logs in
     */
    credential: UserCredential | null;

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
    'credential': null,
    'isAuthenticated': false,
    'isInProgress': false,
    'error': null,
};


/**
 * A structure containing a User, an AuthCredential, the operationType, and any additional user
 * information that was returned from the identity provider. operationType could be 'signIn' for a
 * sign-in operation, 'link' for a linking operation and 'reauthenticate' for a reauthentication operation.
 * https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
 *
 * Note: This is just a re-export of Firebase's UserCredential type.
 * It is essential to this project's state management for auth.
 */
// tslint:disable-next-line: no-empty-interface
export interface UserCredential extends firebase.auth.UserCredential {}

/**
 *  User profile information, visible only to the Firebase project's apps.
 *  https://firebase.google.com/docs/reference/node/firebase.UserInfo
 *
 *  Note: This is just a re-export of Firebase's UserInfo type.
 *  It is essential to this project's state management for auth
 */
// tslint:disable-next-line: no-empty-interface
export interface UserInfo extends FirebaseUserInfo {}

