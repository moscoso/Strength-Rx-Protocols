import { AuthAction, AuthActionType } from './auth.actions';
import { AuthState, AUTH_INIT_STATE, UserInfo } from './auth.state';

export function authReducer(state = AUTH_INIT_STATE, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionType.AUTHENTICATED: {
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
        case AuthActionType.LOGOUT: {
            return { ...state, 'userData': null, 'isAuthenticated': false, 'isFetching': false };
        }
        case AuthActionType.NOT_AUTHENTICATED: {
            return { ...state, 'userData': null, 'isAuthenticated': false, 'isFetching': false };
        }
        case AuthActionType.LOGIN_WITH_EMAIL_AND_PASSWORD:
        case AuthActionType.LOGIN_AS_GUEST:
        case AuthActionType.LOGIN_WITH_FACEBOOK:
        case AuthActionType.LOGIN_WITH_GOOGLE:
        case AuthActionType.SIGNUP:
        case AuthActionType.RESET_PASSWORD:
        case AuthActionType.LOGIN_SUCCESS:
        case AuthActionType.SIGNUP_SUCCESS: {
            return { ...state, 'error': null, 'isFetching': true };
        }
        case AuthActionType.RESET_PASSWORD_SUCCESS: {
            return { ...state, 'error': null, 'isFetching': false };
        }
        case AuthActionType.AUTH_ERROR:
        case AuthActionType.RESET_PASSWORD_FAILED:
        case AuthActionType.SIGNUP_FAILED:
        case AuthActionType.LOGIN_FAILED: {
            return { ...state, 'isFetching': false, 'isAuthenticated': false, 'error': action.payload.error };
        }
        default:
        {
            return state;
        }
    }
}
