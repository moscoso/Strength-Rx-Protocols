import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/state/profile/profile.state';
import { Observable, of } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { ChatStoreDispatcher } from 'src/app/core/state/chat/chat.dispatcher';
import { SetAvatarComponent } from '../set-avatar/set-avatar.component';
import * as dayjs from 'dayjs';
@Component({
    'selector': 'app-view-profile',
    'templateUrl': './view-profile.page.html',
    'styleUrls': ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

    public profile$: Observable < Profile > ;

    public thisIsMe$: Observable < boolean > = of (false);
    public iAmTrainer$: Observable < boolean > = of (false);
    public requestInProgress$: Observable < boolean > = of (false);

    public dayjs = dayjs;

    constructor(
        public profileService: ProfileStoreDispatcher,
        public routerService: RouterStoreDispatcher,
        public modalController: ModalController,
        public chatService: ChatStoreDispatcher,
    ) {}

    ngOnInit() {
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

    // async getConversationLink() {
    //     const profile = await this.profile$.pipe(first()).toPromise();
    //     const myID = await this.profileService.selectUserProfile().pipe(first()).toPromise();
    //     const conversationID = this.chatService.calculateConversationID(myID, profile.id);
    //     return `/chat/${conversationID}`;
    // }

    async fetchProfile() {
        this.profileService.loadAll();
        const router = await this.routerService.selectState().pipe(first()).toPromise();
        const routeID = router.state.params.id;
        if (routeID) {
            this.profile$ = this.profileService.selectProfile(routeID);
        } else {
            this.profile$ = this.profileService.selectUserAsProfile();
        }
    }

    getAvatar(profile: Profile): string {
        return this.profileService.getAvatar(profile);
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'edit-profile',
            'component': EditProfilePage,
            'cssClass': 'modal-80-width'
        });
        await modal.present();
        return;
    }

    async presentAvatar(): Promise < void > {
        const thisIsMe = await this.thisIsMe$.pipe(first()).toPromise();
        if (!thisIsMe) {
            return;
        } else {
            const modal = await this.modalController.create({
                'id': 'set-avatar',
                'component': SetAvatarComponent,
                'cssClass': 'modal-short-height'
            });
            await modal.present();
            return;
        }
    }

    getBirthday(profile: Profile) {
        const birthdayExists = Object.keys(profile.birthday).length !== 0 && profile.birthday.toDate;

        const date: any = birthdayExists ? profile.birthday.toDate() : profile.birthday;
        return dayjs(date).format('MM/DD/YYYY');
    }
}
