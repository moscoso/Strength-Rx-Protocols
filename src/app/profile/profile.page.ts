import { Component, OnInit } from '@angular/core';
import { Profile } from '../core/state/profile/profile.state';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthStoreDispatcher } from '../core/state/auth/auth.dispatcher';
import * as fromProfile from '../core/state/profile/profile.selector';
import { AllRequested } from '../core/state/profile/profile.actions';
import { selectRouterState, selectURL } from '../core/state/router/router.selectors';
import { take, map } from 'rxjs/operators';
import { selectUserID } from '../core/state/auth/auth.selector';

@Component({
    'selector': 'app-profile',
    'templateUrl': './profile.page.html',
    'styleUrls': ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


    public profile$: Observable < Profile > ;
    public isEdit = false;
    public routeID = null;

    public iAmTrainer$: Observable <boolean> = of(false);
    public thisIsMe$: Observable <boolean> = of(false);


    constructor(
        public store: Store,
        public authStore: AuthStoreDispatcher
    ) {}

    ngOnInit() {
        this.store.dispatch(new AllRequested());
        this.fetchProfile();
        this.checkUserPermissions();
    }

    async fetchProfile() {
        const router = await this.store.select(selectRouterState).pipe(take(1)).toPromise();
        const routeID = router.state.params.id;
        if (routeID) {
            this.routeID = routeID;
            this.profile$ = this.store.select(fromProfile.selectProfileByID(routeID));
        } else {
            this.profile$ = this.store.select(fromProfile.selectUserProfile);
        }
    }

    async checkUserPermissions() {
        this.iAmTrainer$ = this.store.select(fromProfile.selectUserIsTrainer);
        /** TODO: Change this to a selector */
        const router = await this.store.select(selectRouterState).pipe(take(1)).toPromise();
        const routeID = router.state.params.id;
        this.thisIsMe$ = this.store.select(selectUserID).pipe(map(userID => userID === routeID));
    }

    getAvatar(profile: Profile) {
        return profile.photoURL != null && profile.photoURL.length > 0 ? profile.photoURL : this.getInitialsAvatar(
            profile);
    }

    getInitialsAvatar(profile: Profile) {
        return `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}`;
    }

    logout() {
        this.authStore.logout();
    }

}
