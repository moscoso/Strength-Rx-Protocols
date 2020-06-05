import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, pluck, map, take } from 'rxjs/operators';


import { AuthState } from './auth.state';
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
        private store: Store < AppState > ,
    ) {}

    public login(email: string, password: string): void {
        this.store.dispatch(new LoginWithEmailAttempted(email, password));
    }

    public signup(email: string, password: string): void {
        this.store.dispatch(new SignupRequested(email, password));
    }

    public resetPassword(email: string): void {
        this.store.dispatch(new PasswordResetRequested(email));
    }

    public logout(): void {
        this.store.dispatch(new LogoutRequested());
    }

    public signInAnonymously(): void {
        this.store.dispatch(new LoginAsGuestRequested());
    }
    public loginWithFacebook(): void {
        this.store.dispatch(new LoginWithFacebookRequested());
    }

    public loginWithGoogle(): void {
        this.store.dispatch(new LoginWithGoogleRequested());
    }

    // public getUserID(): Promise < string > {
    //     return this.getUserData().pipe(
    //         map(userData => userData ? userData.uid : ''),
    //         filter(uid => uid.length > 0),
    //         take(1),
    //     ).toPromise();
    // }

    // public getUserData(): Observable < any > {
    //     return this.getState().pipe(
    //         filter(authState => authState.userData != null),
    //         pluck('userData')
    //     );
    // }

    // public isAuthenticated(): Promise < boolean > {
    //     return this.getState().pipe(
    //         map(auth => auth.userData != null),
    //         take(1),
    //     ).toPromise();
    // }

    // public getState(): Observable < AuthState > {
    //     return this.store.select((state: AppState) => state);
    // }
}
