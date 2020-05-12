import { Action } from '@ngrx/store';

export enum AuthActionType {
    AUTHENTICATED = '[AngularFireAuth] Authenticated',
    NOT_AUTHENTICATED = '[AngularFireAuth] Not Authenticated',
    LOGIN_WITH_EMAIL_AND_PASSWORD = '[AngularFireAuth] Email Login Attempt',
    LOGIN_AS_GUEST = '[AngularFireAuth] Login As Guest Attempt',
    LOGIN_WITH_FACEBOOK = '[AngularFireAuth] Login With Facebook Attempt',
    LOGIN_WITH_GOOGLE = '[AngularFireAuth] Login With Google Attempt',
    LOGIN_SUCCESS = '[AngularFireAuth] Login Success',
    LOGIN_FAILED = '[AngularFireAuth] Login Failed',
    SIGNUP = '[AngularFireAuth] Signup Attempt',
    SIGNUP_SUCCESS = '[AngularFireAuth] Signup Success',
    SIGNUP_FAILED = '[AngularFireAuth] Signup Error',
    LOGOUT = '[AngularFireAuth] Logout',
    RESET_PASSWORD = '[AngularFireAuth] Reset Password Attempt',
    RESET_PASSWORD_SUCCESS = '[AngularFireAuth] Reset Password Success',
    RESET_PASSWORD_FAILED = '[AngularFireAuth] Reset Password Error',
    AUTH_ERROR = '[AngularFireAuth] Authentication Error'
}


export class AuthenticatedAction implements Action {
    readonly type = AuthActionType.AUTHENTICATED;
    constructor(public payload?: any) {}
}

export class NotAuthenticatedAction implements Action {
    readonly type = AuthActionType.NOT_AUTHENTICATED;
    constructor(public payload?: any) {}
}

export class LoginWithEmailAction implements Action {
    readonly type = AuthActionType.LOGIN_WITH_EMAIL_AND_PASSWORD;
    public payload;
    constructor(email: string, password: string) {
        this.payload = {'email': email, 'password': password};
    }
}

export class LoginWithFacebookAction implements Action {
    readonly type = AuthActionType.LOGIN_WITH_FACEBOOK;
    constructor(public payload?: any) {}
}

export class LoginWithGoogleAction implements Action {
    readonly type = AuthActionType.LOGIN_WITH_GOOGLE;
    constructor(public payload?: any) {}
}

export class LoginAsGuestAction implements Action {
    readonly type = AuthActionType.LOGIN_AS_GUEST;
    constructor(public payload?: any) {}
}


export class LoginSuccessAction implements Action {
    readonly type = AuthActionType.LOGIN_SUCCESS;
    constructor(public payload?: any) {}
}

export class LoginFailedAction implements Action {
    readonly type = AuthActionType.LOGIN_FAILED;
    public payload;
    constructor(error: any) {
        this.payload = {'error': error};
    }
}

export class ResetPasswordAction implements Action {
    readonly type = AuthActionType.RESET_PASSWORD;
    public payload;
    constructor(email: string) {
        this.payload = {'email': email};
    }
}

export class ResetPasswordSuccessAction implements Action {
    readonly type = AuthActionType.RESET_PASSWORD_SUCCESS;
    constructor(public payload?: any) {}
}

export class ResetPasswordFailedAction implements Action {
    readonly type = AuthActionType.RESET_PASSWORD_FAILED;
    public payload;
    constructor(error: any) {
        this.payload = {'error': error};
    }
}

export class SignupAction implements Action {
    readonly type = AuthActionType.SIGNUP;
    public payload;
    constructor(email: string, password: string) {
        this.payload = {'email': email, 'password': password};
    }
}

export class SignupSuccessAction implements Action {
    readonly type = AuthActionType.SIGNUP_SUCCESS;
    constructor(public payload?: any) {}
}


export class SignupErrorAction implements Action {
    readonly type = AuthActionType.SIGNUP_FAILED;
    public payload;
    constructor(error: any) {
        this.payload = {'error': error};
    }
}

export class LogoutAction implements Action {
    readonly type = AuthActionType.LOGOUT;
    constructor(public payload?: any) {}
}

export class AuthErrorAction implements Action {
    readonly type = AuthActionType.AUTH_ERROR;
    public payload;
    constructor(error: any) {
        this.payload = {'error': error};
    }
}

export type AuthAction
    = AuthenticatedAction
    | NotAuthenticatedAction
    | LoginWithEmailAction
    | LoginWithFacebookAction
    | LoginWithGoogleAction
    | LoginAsGuestAction
    | LoginSuccessAction
    | LoginFailedAction
    | ResetPasswordAction
    | ResetPasswordSuccessAction
    | ResetPasswordFailedAction
    | SignupAction
    | SignupSuccessAction
    | SignupErrorAction
    | LogoutAction
    | AuthErrorAction;
