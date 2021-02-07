import { AuthAction, AuthActionType } from './auth.actions';
import { AuthModel, AUTH_INIT_MODEL } from './auth.model';

export function authReducer(state = AUTH_INIT_MODEL, action: AuthAction): AuthModel {
    switch (action.type) {
        case AuthActionType.LoginCompleted:
        case AuthActionType.LoginAsNewAccountCompleted:
        {
            return { ...state, 'error': null, 'isInProgress': false };
        }
        case AuthActionType.Authenticated: {
            const userData: any = action.authenticatedUser;
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
            return { ...state, 'isInProgress': true };

        case AuthActionType.NotAuthenticated:
            return { ...state, 'userData': null, 'isAuthenticated': false, 'isInProgress': false };

        case AuthActionType.LoginWithEmailAndPasswordAttempted:
        case AuthActionType.LoginWithEmailAndPasswordAsNewAccountAttempted:
        case AuthActionType.LoginAsGuest:
        case AuthActionType.LoginWithFacebook:
        case AuthActionType.LoginWithGoogle:
        case AuthActionType.SignupRequested:
        case AuthActionType.PasswordResetRequested:
            return { ...state, 'error': null, 'isInProgress': true };
        case AuthActionType.SignupCompleted:
        case AuthActionType.PasswordResetCompleted:
            return { ...state, 'error': null, 'isInProgress': false };
        case AuthActionType.AuthFailed:
        case AuthActionType.PasswordResetFailed:
        case AuthActionType.SignupFailed:
        case AuthActionType.LoginFailed:
            return { ...state, 'isInProgress': false, 'isAuthenticated': false, 'error': action.error };

        default:
            return state;
    }
}
