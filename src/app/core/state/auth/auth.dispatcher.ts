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
    LoginWithGoogleRequested,
    Authenticated,
    NotAuthenticated
} from './auth.actions';
import { FireAuthService } from '../../firebase/auth/auth.service';
import { pluck, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserInfo } from 'firebase';
import { selectUserData, selectAuthenticated, selectState, selectUserID } from './auth.selector';
import { AuthState } from './auth.state';
import { StateModule } from '../state.module';

/**
 * This service is responsible for dispatching auth actions to the Store and selecting
 * auth data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class AuthStoreDispatcher {
    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService
    ) {
        this.fireAuth.getUser().subscribe(async (authenticatedUser: firebase.User) => {
            if (authenticatedUser) {
                const userInfo = this.scrapeUserInfo(authenticatedUser);
                this.store.dispatch(new Authenticated(userInfo));
            } else {
                this.store.dispatch(new NotAuthenticated());
            }
        });
    }

    /** Dispatch a LoginWithEmailAttempted action to the store */
    public login(email: string, password: string): void {
        this.store.dispatch(new LoginWithEmailAttempted(email, password));
    }

    /** Dispatch a SignUpRequested action to the store */
    public signup(email: string, password: string): void {
        this.store.dispatch(new SignupRequested(email, password));
    }

    /** Dispatch a PasswordResetRequested action to the store */
    public resetPassword(email: string): void {
        this.store.dispatch(new PasswordResetRequested(email));
    }

    /** Dispatch a LogoutRequested action to the store */
    public logout(): void {
        this.store.dispatch(new LogoutRequested());
    }

    /** Dispatch a LoginAsGuestRequested action to the store */
    public signInAnonymously(): void {
        this.store.dispatch(new LoginAsGuestRequested());
    }

    /** Dispatch a LoginWithFacebookRequested action to the store */
    public loginWithFacebook(): void {
        this.store.dispatch(new LoginWithFacebookRequested());
    }

    /** Dispatch a LoginWithGoogleRequested action to the store */
    public loginWithGoogle(): void {
        this.store.dispatch(new LoginWithGoogleRequested());
    }

    public getUserID(): Promise < string > {
        return this.selectUserData().pipe(pluck('uid'), take(1)).toPromise();
    }

    public selectUserData(): Observable < UserInfo > {
        return this.store.select(selectUserData);
    }

    public isAuthenticated(): Promise < boolean > {
        return this.selectAuthenticated().pipe(take(1)).toPromise();
    }

    public selectAuthenticated(): Observable < boolean > {
        return this.store.select(selectAuthenticated);
    }

    public selectState(): Observable < AuthState > {
        return this.store.select(selectState);
    }

    public selectUserID(): Observable < string > {
        return this.store.select(selectUserID);
    }

    /**
     * Scrape the provided firebase.User object into a POJO matching the UserData interface.
     * @param authenticatedUser an authenticated user account
     */
    private scrapeUserInfo(authenticatedUser: firebase.User): UserInfo {
        const userInfo: UserInfo = {
            'displayName': authenticatedUser.displayName,
            'email': authenticatedUser.email,
            'phoneNumber': authenticatedUser.phoneNumber,
            'providerId': authenticatedUser.providerId,
            'uid': authenticatedUser.uid,
            'photoURL': authenticatedUser.photoURL,
        };
        return userInfo;
    }
}
