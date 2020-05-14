import { AuthAction, AuthActionType } from './auth.actions';
import { AuthState, AUTH_INIT_STATE, UserInfo } from './auth.state';

export function authReducer(state = AUTH_INIT_STATE, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionType.Authenticated: {
            const userData: UserInfo = action.payload.userData;
            return {
                ...state,
                'userID': userData.uid,
                'userData': userData,
                'isAuthenticated': true,
                'isFetching': false,
                'error': null
            };
        }
        case AuthActionType.LogoutRequested: {
            return { ...state, 'userData': null, 'isAuthenticated': false, 'isFetching': false };
        }
        case AuthActionType.NotAuthenticated: {
            return { ...state, 'userData': null, 'isAuthenticated': false, 'isFetching': false };
        }
        case AuthActionType.LoginWithEmailAndPassword:
        case AuthActionType.LoginAsGuest:
        case AuthActionType.LoginWithFacebook:
        case AuthActionType.LoginWithGoogle:
        case AuthActionType.SignupRequested:
        case AuthActionType.ResetPasswordRequested:
        case AuthActionType.LoginCompleted:
        case AuthActionType.SignupCompleted: {
            return { ...state, 'error': null, 'isFetching': true };
        }
        case AuthActionType.ResetPasswordCompleted: {
            return { ...state, 'error': null, 'isFetching': false };
        }
        case AuthActionType.AuthFailed:
        case AuthActionType.ResetPasswordFailed:
        case AuthActionType.SignupFailed:
        case AuthActionType.LoginFailed: {
            return { ...state, 'isFetching': false, 'isAuthenticated': false, 'error': action.payload.error };
        }
        default:
        {
            return state;
        }
    }
}
