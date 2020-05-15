import { Action } from '@ngrx/store';
import { UserInfo, UserCredential } from './auth.state';

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
    constructor(public authenticatedUser: UserInfo) {}
}

export class NotAuthenticatedAction implements Action {
    readonly type = AuthActionType.NotAuthenticated;
    constructor() {}
}

export class LoginWithEmailAction implements Action {
    readonly type = AuthActionType.LoginWithEmailAndPassword;
    constructor(public email: string, public password: string) {}
}

export class LoginWithFacebookAction implements Action {
    readonly type = AuthActionType.LoginWithFacebook;
    constructor() {}
}

export class LoginWithGoogleAction implements Action {
    readonly type = AuthActionType.LoginWithGoogle;
    constructor() {}
}

export class LoginAsGuestAction implements Action {
    readonly type = AuthActionType.LoginAsGuest;
    constructor() {}
}


export class LoginSuccessAction implements Action {
    readonly type = AuthActionType.LoginCompleted;
    constructor(public credential: UserCredential) {}
}

export class LoginFailedAction implements Action {
    readonly type = AuthActionType.LoginFailed;
    constructor(public error: any) {}
}

export class ResetPasswordAction implements Action {
    readonly type = AuthActionType.ResetPasswordRequested;
    constructor(public email: string) {}
}

export class ResetPasswordSuccessAction implements Action {
    readonly type = AuthActionType.ResetPasswordCompleted;
    constructor() {}
}

export class ResetPasswordFailedAction implements Action {
    readonly type = AuthActionType.ResetPasswordFailed;
    constructor(public error: any) {}
}

export class SignupAction implements Action {
    readonly type = AuthActionType.SignupRequested;
    constructor(public email: string, public password: string) {}
}

export class SignupSuccessAction implements Action {
    readonly type = AuthActionType.SignupCompleted;
    constructor(public credential: UserCredential) {}
}


export class SignupErrorAction implements Action {
    readonly type = AuthActionType.SignupFailed;
    constructor(public error: any) {}
}

export class LogoutAction implements Action {
    readonly type = AuthActionType.LogoutRequested;
    constructor() {}
}

export class AuthErrorAction implements Action {
    readonly type = AuthActionType.AuthFailed;
    constructor(public error: any) {}
}

export type AuthAction
    = AuthenticatedAction |
    NotAuthenticatedAction |
    LoginWithEmailAction |
    LoginWithFacebookAction |
    LoginWithGoogleAction |
    LoginAsGuestAction |
    LoginSuccessAction |
    LoginFailedAction |
    ResetPasswordAction |
    ResetPasswordSuccessAction |
    ResetPasswordFailedAction |
    SignupAction |
    SignupSuccessAction |
    SignupErrorAction |
    LogoutAction |
    AuthErrorAction;
