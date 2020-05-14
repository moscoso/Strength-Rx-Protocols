import { Action } from '@ngrx/store';

export enum AuthActionType {
    Authenticated = '[Firebase Auth API] Authenticated',
    NotAuthenticated = '[Firebase Auth API] Not Authenticated',
    LoginWithEmailAndPassword = '[Auth Service] Email Login Attempted',
    LoginAsGuest = '[Auth Service] Login As Guest Attempted',
    LoginWithFacebook = '[Auth Service] Login With Facebook Attempted',
    LoginWithGoogle = '[Auth Service] Login With Google Attempted',
    LoginCompleted = '[Auth Service] Login Completed Successfully',
    LoginFailed = '[Auth Service] Login Failed',
    SignupRequested = '[Auth Service] Signup Attempt',
    SignupCompleted = '[Auth Service] Signup Completed Successfully',
    SignupFailed = '[Auth Service] Signup Error',
    LogoutRequested = '[Auth Service] Logout',
    ResetPasswordRequested = '[Auth Service] Reset Password Attempt',
    ResetPasswordCompleted = '[Auth Service] Reset Password Completed Successfully',
    ResetPasswordFailed = '[Auth Service] Reset Password Error',
    AuthFailed = '[Firebase Auth API] Authentication Failed with Error'
}


export class AuthenticatedAction implements Action {
    readonly type = AuthActionType.Authenticated;
    constructor(public payload?: any) {}
}

export class NotAuthenticatedAction implements Action {
    readonly type = AuthActionType.NotAuthenticated;
    constructor(public payload?: any) {}
}

export class LoginWithEmailAction implements Action {
    readonly type = AuthActionType.LoginWithEmailAndPassword;
    public payload;
    constructor(email: string, password: string) {
        this.payload = {'email': email, 'password': password};
    }
}

export class LoginWithFacebookAction implements Action {
    readonly type = AuthActionType.LoginWithFacebook;
    constructor(public payload?: any) {}
}

export class LoginWithGoogleAction implements Action {
    readonly type = AuthActionType.LoginWithGoogle;
    constructor(public payload?: any) {}
}

export class LoginAsGuestAction implements Action {
    readonly type = AuthActionType.LoginAsGuest;
    constructor(public payload?: any) {}
}


export class LoginSuccessAction implements Action {
    readonly type = AuthActionType.LoginCompleted;
    constructor(public payload?: any) {}
}

export class LoginFailedAction implements Action {
    readonly type = AuthActionType.LoginFailed;
    public payload;
    constructor(error: any) {
        this.payload = {'error': error};
    }
}

export class ResetPasswordAction implements Action {
    readonly type = AuthActionType.ResetPasswordRequested;
    public payload;
    constructor(email: string) {
        this.payload = {'email': email};
    }
}

export class ResetPasswordSuccessAction implements Action {
    readonly type = AuthActionType.ResetPasswordCompleted;
    constructor(public payload?: any) {}
}

export class ResetPasswordFailedAction implements Action {
    readonly type = AuthActionType.ResetPasswordFailed;
    public payload;
    constructor(error: any) {
        this.payload = {'error': error};
    }
}

export class SignupAction implements Action {
    readonly type = AuthActionType.SignupRequested;
    public payload;
    constructor(email: string, password: string) {
        this.payload = {'email': email, 'password': password};
    }
}

export class SignupSuccessAction implements Action {
    readonly type = AuthActionType.SignupCompleted;
    constructor(public payload?: any) {}
}


export class SignupErrorAction implements Action {
    readonly type = AuthActionType.SignupFailed;
    public payload;
    constructor(error: any) {
        this.payload = {'error': error};
    }
}

export class LogoutAction implements Action {
    readonly type = AuthActionType.LogoutRequested;
    constructor(public payload?: any) {}
}

export class AuthErrorAction implements Action {
    readonly type = AuthActionType.AuthFailed;
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
