import { Action } from '@ngrx/store';

export enum AuthActionType {
    Authenticated = '[Firebase Auth API] Authenticated',
    NotAuthenticated = '[Firebase Auth API] Not Authenticated',
    LoginWithEmailAndPasswordAttempted = '[Auth Service] Email Login Attempted',
    LoginAsGuest = '[Auth Service] Login As Guest Attempted',
    LoginWithFacebook = '[Auth Service] Login With Facebook Attempted',
    LoginWithGoogle = '[Auth Service] Login With Google Attempted',
    LoginCompleted = '[Auth Service] Login Completed',
    LoginFailed = '[Auth Service] Login Failed',
    SignupRequested = '[Auth Service] Signup Attempted',
    SignupCompleted = '[Auth Service] Signup Completed',
    SignupFailed = '[Auth Service] Signup Error',
    LogoutRequested = '[Auth Service] Logout',
    PasswordResetRequested = '[Auth Service] Password Reset Attempted',
    PasswordResetCompleted = '[Auth Service] Password Reset Completed',
    PasswordResetFailed = '[Auth Service] Password Reset Error',
    AuthFailed = '[Firebase Auth API] Authentication Failed with Error'
}


export class Authenticated implements Action {
    readonly type = AuthActionType.Authenticated;
    constructor(public authenticatedUser: any) {}
}

export class NotAuthenticated implements Action {
    readonly type = AuthActionType.NotAuthenticated;
    constructor() {}
}

export class LoginWithEmailAttempted implements Action {
    readonly type = AuthActionType.LoginWithEmailAndPasswordAttempted;
    constructor(public email: string, public password: string) {}
}

export class LoginWithFacebookRequested implements Action {
    readonly type = AuthActionType.LoginWithFacebook;
    constructor() {}
}

export class LoginWithGoogleRequested implements Action {
    readonly type = AuthActionType.LoginWithGoogle;
    constructor() {}
}

export class LoginAsGuestRequested implements Action {
    readonly type = AuthActionType.LoginAsGuest;
    constructor() {}
}


export class LoginCompleted implements Action {
    readonly type = AuthActionType.LoginCompleted;
    constructor() { }
}

export class LoginFailed implements Action {
    readonly type = AuthActionType.LoginFailed;
    constructor(public error: any) {}
}

export class PasswordResetRequested implements Action {
    readonly type = AuthActionType.PasswordResetRequested;
    constructor(public email: string) {}
}

export class PasswordResetCompleted implements Action {
    readonly type = AuthActionType.PasswordResetCompleted;
    constructor() {}
}

export class ResetPasswordFailed implements Action {
    readonly type = AuthActionType.PasswordResetFailed;
    constructor(public error: any) {}
}

export class SignupRequested implements Action {
    readonly type = AuthActionType.SignupRequested;
    constructor(public email: string, public password: string) {}
}

export class SignupCompleted implements Action {
    readonly type = AuthActionType.SignupCompleted;
    constructor() {}
}


export class SignupFailed implements Action {
    readonly type = AuthActionType.SignupFailed;
    constructor(public error: any) {}
}

export class LogoutRequested implements Action {
    readonly type = AuthActionType.LogoutRequested;
    constructor() {}
}

export class AuthFailed implements Action {
    readonly type = AuthActionType.AuthFailed;
    constructor(public error: any) {}
}

export type AuthAction
    = Authenticated |
    NotAuthenticated |
    LoginWithEmailAttempted |
    LoginWithFacebookRequested |
    LoginWithGoogleRequested |
    LoginAsGuestRequested |
    LoginCompleted |
    LoginFailed |
    PasswordResetRequested |
    PasswordResetCompleted |
    ResetPasswordFailed |
    SignupRequested |
    SignupCompleted |
    SignupFailed |
    LogoutRequested |
    AuthFailed;
