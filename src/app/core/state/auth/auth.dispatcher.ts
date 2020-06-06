import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
    LoginWithEmailAttempted,
    SignupRequested,
    PasswordResetRequested,
    LogoutRequested,
    LoginAsGuestRequested,
    LoginWithFacebookRequested,
    LoginWithGoogleRequested
} from './auth.actions';

@Injectable()
export class AuthStoreDispatcher {
    constructor(
        protected store: Store < AppState > ,
    ) {}

    /** Dispatch a LoginWithEmailAttempted action */
    public login(email: string, password: string): void {
        this.store.dispatch(new LoginWithEmailAttempted(email, password));
    }

    /** Dispatch a SignUpRequested action */
    public signup(email: string, password: string): void {
        this.store.dispatch(new SignupRequested(email, password));
    }

    /** Dispatch a PasswordResetRequested action */
    public resetPassword(email: string): void {
        this.store.dispatch(new PasswordResetRequested(email));
    }

    /** Dispatch a LogoutRequested action */
    public logout(): void {
        this.store.dispatch(new LogoutRequested());
    }

    /** Dispatch a LoginAsGuestRequested action */
    public signInAnonymously(): void {
        this.store.dispatch(new LoginAsGuestRequested());
    }

    /** Dispatch a LoginWithFacebookRequested action */
    public loginWithFacebook(): void {
        this.store.dispatch(new LoginWithFacebookRequested());
    }

    /** Dispatch a LoginWithGoogleRequested action */
    public loginWithGoogle(): void {
        this.store.dispatch(new LoginWithGoogleRequested());
    }
}
