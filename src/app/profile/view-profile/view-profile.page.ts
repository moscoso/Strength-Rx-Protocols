import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/state/profile/profile.state';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';
import * as fromProfile from 'src/app/core/state/profile/profile.selector';
import { AllRequested } from 'src/app/core/state/profile/profile.actions';
import { selectRouterState } from 'src/app/core/state/router/router.selectors';
import { take, map } from 'rxjs/operators';
import { selectUserID } from 'src/app/core/state/auth/auth.selector';
import { ModalController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
@Component({
    'selector': 'app-view-profile',
    'templateUrl': './view-profile.page.html',
    'styleUrls': ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

    public profile$: Observable < Profile > ;
    public routeID = null;

    public iAmTrainer$: Observable < boolean > = of (false);
    public thisIsMe$: Observable < boolean > = of (false);


    constructor(
        public store: Store,
        public authStore: AuthStoreDispatcher,
        public modalController: ModalController,
    ) {}

    ngOnInit() {
        this.store.dispatch(new AllRequested());
        this.fetchProfile();
        this.iAmTrainer$ = this.store.select(fromProfile.selectUserIsTrainer);
        this.checkProfileBelongsToUser();
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

    async checkProfileBelongsToUser() {
        const router = await this.store.select(selectRouterState).pipe(take(1)).toPromise();
        const routeID = router.state.params.id;
        this.thisIsMe$ = this.store.select(selectUserID).pipe(map(userID => userID === routeID || routeID == null));
    }

    getAvatar(profile: Profile) {
        return profile.photoURL != null && profile.photoURL.length > 0 ? profile.photoURL : this.getInitialsAvatar(
            profile);
    }

    getInitialsAvatar(profile: Profile) {
        return `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}`;
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'edit-profile',
            'component': EditProfilePage
        });
        await modal.present();
        return;
    }

    logout() {
        this.authStore.logout();
    }
}
