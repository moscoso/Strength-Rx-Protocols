import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import {
    AuthenticatedAction,
    LoginWithEmailAction,
    LogoutAction,
    NotAuthenticatedAction,
    ResetPasswordAction,
    SignupAction,
    LoginAsGuestAction,
    LoginWithFacebookAction,
    LoginWithGoogleAction
} from './auth.actions';
import { AuthState, UserInfo } from './auth.state';
import { filter, pluck, map, take } from 'rxjs/operators';
import { AppState } from '../app.state';

@Injectable()
export class AuthStoreDispatcher {
    constructor(
        private store: Store < AppState > ,
    ) {}

    public login(email: string, password: string): void {
        this.store.dispatch(new LoginWithEmailAction(email, password));
    }

    public signup(email: string, password: string): void {
        this.store.dispatch(new SignupAction(email, password));
    }

    public resetPassword(email: string): void {
        this.store.dispatch(new ResetPasswordAction(email));
    }

    public logout(): void {
        this.store.dispatch(new LogoutAction());
    }

    public signInAnonymously(): void {
        this.store.dispatch(new LoginAsGuestAction());
    }
    public loginWithFacebook(): void {
        this.store.dispatch(new LoginWithFacebookAction());
    }

    public loginWithGoogle(): void {
        this.store.dispatch(new LoginWithGoogleAction());
    }

    /**  Returns the ID of the authenticated user */
    public getUserID(): Promise < string > {
        return this.getUserData().pipe(
            map(userData => userData ? userData.uid : ''),
            filter(uid => uid.length > 0),
            take(1),
        ).toPromise();
    }

    public getUserData(): Observable < UserInfo > {
        return this.getState().pipe(
            filter(authState => authState.userData != null),
            pluck('userData')
        );
    }

    public getState(): Observable < AuthState > {
        return this.store.select((state: AppState) => state.auth).pipe(
            filter(authState => authState != null)
        );
    }
}
