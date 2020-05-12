export interface AuthState {
    userID: string | null;
    userData: UserInfo | null; // firebase user model
    isAuthenticated: boolean;
    isFetching: boolean;
    error ?: any;
}

export const AUTH_INIT_STATE: AuthState = {
    'userID': null,
    'userData': null,
    'isAuthenticated': false,
    'isFetching': false,
    'error': null,
};


export interface UserInfo {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}
