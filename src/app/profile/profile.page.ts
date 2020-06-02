import { Component, OnInit } from '@angular/core';
import { Profile } from '../core/state/profile/profile.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthStoreDispatcher } from '../core/state/auth/auth.dispatcher';
import * as fromProfile from '../core/state/profile/profile.selector';
import { AllRequested } from '../core/state/profile/profile.actions';
import { selectRouterState, selectURL } from '../core/state/router/router.selectors';
import { take } from 'rxjs/operators';

@Component({
    'selector': 'app-profile',
    'templateUrl': './profile.page.html',
    'styleUrls': ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


    public profile$: Observable < Profile > ;
    public isEdit = false;
    public routeID = null;


    constructor(
        public store: Store,
        public authStore: AuthStoreDispatcher
    ) {}

    ngOnInit() {
        this.store.dispatch(new AllRequested());
        this.fetchProfile();
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
