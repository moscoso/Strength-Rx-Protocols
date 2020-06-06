import { Injectable } from '@angular/core';
import { StateModule } from '../state.module';
import { AuthStoreDispatcher } from './auth.dispatcher';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { take, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthState } from './auth.state';
import { selectState, selectAuthenticated, selectUserID } from './auth.selector';
import { UserInfo as UserData } from 'firebase';
import { FireAuthService } from '../../firebase/auth/auth.service';
import { Authenticated, NotAuthenticated } from './auth.actions';


/**
 * This service is responsible for dispatching auth actions to the Store and selecting
 * auth data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class AuthStateService extends AuthStoreDispatcher {

    constructor(protected store: Store < AppState > , protected fireAuth: FireAuthService) {
        super(store);
        this.fireAuth.getUser().subscribe(async (authenticatedUser: firebase.User) => {
            if (authenticatedUser) {
                const userInfo = this.scrapeUserInfo(authenticatedUser);
                this.store.dispatch(new Authenticated(userInfo));
            } else {
                this.store.dispatch(new NotAuthenticated());
            }
        });
    }

    public getUserID(): Promise < string > {
        return this.getUserData().pipe(pluck('uid'), take(1)).toPromise();
    }

    public getUserData(): Observable < UserData > {
        return this.selectState().pipe(pluck('userData'));
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
    private scrapeUserInfo(authenticatedUser: firebase.User): UserData {
        const userInfo: any = {
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
