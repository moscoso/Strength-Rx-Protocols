export interface AuthState {
    userID: string | null;
    userData: UserInfo | null; // firebase user model
    isAuthenticated: boolean;
    isFetching: boolean;
    error?: any;
}

export const AUTH_INIT_STATE: AuthState = {
    'userID': null,
    'userData': null,
    'isAuthenticated': false,
    'isFetching': false,
    'error': null,
};

/**
 * Represents a collection of standard profile information for a user.
 * Can be used to expose profile information returned by an identity provider,
 * such as Google Sign-In or Facebook Login.
 * https://firebase.google.com/docs/reference/android/com/google/firebase/auth/UserInfo
 */
export interface UserInfo {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}
