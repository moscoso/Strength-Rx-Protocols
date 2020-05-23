import { AuthAction, AuthActionType } from './auth.actions';
import { AuthState, AUTH_INIT_STATE, UserInfo } from './auth.state';

export function authReducer(state = AUTH_INIT_STATE, action: AuthAction): AuthState {
    console.log(action.type);
    switch (action.type) {
        case AuthActionType.Authenticated: {
            const userData: UserInfo = action.authenticatedUser;
            return {
                ...state,
                'userID': userData.uid,
                'userData': userData,
                'isAuthenticated': true,
                'isInProgress': false,
                'error': null
            };
        }
        case AuthActionType.LogoutRequested:
            return { ...state, 'userData': null, 'isAuthenticated': false, 'isInProgress': false };

        case AuthActionType.NotAuthenticated:
            return { ...state, 'userData': null, 'isAuthenticated': false, 'isInProgress': false };

        case AuthActionType.LoginWithEmailAndPassword:
        case AuthActionType.LoginAsGuest:
        case AuthActionType.LoginWithFacebook:
        case AuthActionType.LoginWithGoogle:
        case AuthActionType.SignupRequested:
        case AuthActionType.ResetPasswordRequested:
            return { ...state, 'error': null, 'isInProgress': true };

        case AuthActionType.LoginCompleted:
        case AuthActionType.SignupCompleted:
            return { ...state, 'error': null, 'isInProgress': false, 'credential': action.credential };
        case AuthActionType.ResetPasswordCompleted:
            return { ...state, 'error': null, 'isInProgress': false };

        case AuthActionType.AuthFailed:
        case AuthActionType.ResetPasswordFailed:
        case AuthActionType.SignupFailed:
        case AuthActionType.LoginFailed:
            return { ...state, 'isInProgress': false, 'isAuthenticated': false, 'error': action.error };

        default:
            return state;
    }
}
