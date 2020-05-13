import { Action } from '@ngrx/store';

export enum AuthActionType {
    AUTHENTICATED = '[Firebase Auth API] Authenticated',
    NOT_AUTHENTICATED = '[Firebase Auth API] Not Authenticated',
    LOGIN_WITH_EMAIL_AND_PASSWORD = '[Auth Service] Email Login Attempted',
    LOGIN_AS_GUEST = '[Auth Service] Login As Guest Attempted',
    LOGIN_WITH_FACEBOOK = '[Auth Service] Login With Facebook Attempted',
    LOGIN_WITH_GOOGLE = '[Auth Service] Login With Google Attempted',
    LOGIN_COMPLETED = '[Auth Service] Login Completed Successfully',
    LOGIN_FAILED = '[Auth Service] Login Failed',
    SIGNUP = '[Auth Service] Signup Attempt',
    SIGNUP_COMPLETED = '[Auth Service] Signup Completed Successfully',
    SIGNUP_FAILED = '[Auth Service] Signup Error',
    LOGOUT = '[Auth Service] Logout',
    RESET_PASSWORD = '[Auth Service] Reset Password Attempt',
    RESET_PASSWORD_COMPLETED = '[Auth Service] Reset Password Completed Successfully',
    RESET_PASSWORD_FAILED = '[Auth Service] Reset Password Error',
    AUTH_ERROR = '[Firebase Auth API] Authentication Error'
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
    readonly type = AuthActionType.LOGIN_COMPLETED;
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
    readonly type = AuthActionType.RESET_PASSWORD_COMPLETED;
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
    readonly type = AuthActionType.SIGNUP_COMPLETED;
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
