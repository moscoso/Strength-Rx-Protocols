import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/state/profile/profile.state';
import { Observable, of } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
@Component({
    'selector': 'app-view-profile',
    'templateUrl': './view-profile.page.html',
    'styleUrls': ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

    public profile$: Observable < Profile > ;
    public routeID = null;

    public thisIsMe$: Observable < boolean > = of (false);
    public iAmTrainer$: Observable < boolean > = of (false);
    public requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public profileService: ProfileStoreDispatcher,
        public routerService: RouterStoreDispatcher,
        public modalController: ModalController,
    ) {}

    ngOnInit() {
        this.profileService.loadAll();
        this.fetchProfile();
        this.requestInProgress$ = this.profileService.selectRequestInProgress();
        this.thisIsMe$ = this.profileService.selectProfileBelongsToUser();
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
    }

    doRefresh(event): void {
        this.profileService.loadAll();
        this.profileService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    retryLoad() {
        this.profileService.loadAll();
    }

    async fetchProfile() {
        const router = await this.routerService.selectState().pipe(take(1)).toPromise();
        const routeID = router.state.params.id;
        if (routeID) {
            this.routeID = routeID;
            this.profile$ = this.profileService.selectProfile(routeID);
        } else {
            this.profile$ = this.profileService.selectUserProfile();
        }
    }

    getAvatar(profile: Profile) {
        const photoURLExists = profile.photoURL != null && profile.photoURL.length > 0;
        return photoURLExists ?  profile.photoURL : this.getInitialsAvatar(profile);
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
}
