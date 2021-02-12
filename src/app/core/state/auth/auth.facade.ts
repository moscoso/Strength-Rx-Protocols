import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as AuthActions from './auth.actions';
import { FireAuthService } from '../../firebase/auth/auth.service';
import { pluck, first, distinct } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserInfo } from 'firebase';
import { selectUserData, selectAuthenticated, selectState, selectUserID } from './auth.selector';
import { AuthModel } from './auth.model';
import { StateModule } from '../state.module';
import { firstNonNullValue } from 'src/util/operator/Operators';

/**
 * This service is responsible for dispatching actions to the Store
 * and selecting data from the Store related to Auth
 */
@Injectable({ 'providedIn': StateModule })
export class AuthFacade {
    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService
    ) {
        this.fireAuth.getUser().pipe(distinct()).subscribe(async (authenticatedUser: firebase.User) => {
            if (authenticatedUser) {
                const userInfo = this.scrapeUserInfo(authenticatedUser);
                this.store.dispatch(new AuthActions.Authenticated(userInfo));
            } else {
                this.store.dispatch(new AuthActions.NotAuthenticated());
            }
        });
    }

    /** Dispatch a LoginWithEmailAttempted action to the store */
    public login(email: string, password: string): void {
        this.store.dispatch(new AuthActions.LoginWithEmailAttempted(email, password));
    }

    /** Dispatch a LoginWithEmailAsNewAccountAttempted action to the store */
    public loginAsNewAccount(email: string, password: string, plan: any): void {
        this.store.dispatch(new AuthActions.LoginWithEmailAsNewAccountAttempted(email, password, plan));
    }

    /** Dispatch a SignUpRequested action to the store */
    public signup(email: string, password: string): void {
        this.store.dispatch(new AuthActions.SignupRequested(email, password));
    }

    /** Dispatch a PasswordResetRequested action to the store */
    public resetPassword(email: string): void {
        this.store.dispatch(new AuthActions.PasswordResetRequested(email));
    }

    /** Dispatch a LogoutRequested action to the store */
    public logout(): void {
        this.store.dispatch(new AuthActions.LogoutRequested());
    }

    /** Dispatch a LoginAsGuestRequested action to the store */
    public signInAnonymously(): void {
        this.store.dispatch(new AuthActions.LoginAsGuestRequested());
    }

    /** Dispatch a LoginWithFacebookRequested action to the store */
    public loginWithFacebook(): void {
        this.store.dispatch(new AuthActions.LoginWithFacebookRequested());
    }

    /** Dispatch a LoginWithGoogleRequested action to the store */
    public loginWithGoogle(): void {
        this.store.dispatch(new AuthActions.LoginWithGoogleRequested());
    }

    public getUserID(): Promise < string > {
        return this.selectUserData().pipe(firstNonNullValue, pluck('uid')).toPromise();
    }

    public selectUserData(): Observable < UserInfo > {
        return this.store.select(selectUserData);
    }

    public isAuthenticated(): Promise < boolean > {
        return this.selectAuthenticated().pipe(first()).toPromise();
    }

    public selectAuthenticated(): Observable < boolean > {
        return this.store.select(selectAuthenticated);
    }

    public selectState(): Observable < AuthModel > {
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
