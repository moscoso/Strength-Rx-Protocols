import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { Profile } from 'src/app/core/state/profile/profile.state';
import { ImageInputComponent } from 'src/app/storage/image-input/image-input.component';

@Component({
    'selector': 'app-set-avatar',
    'templateUrl': './set-avatar.component.html',
    'styleUrls': ['./set-avatar.component.scss'],
})
export class SetAvatarComponent implements OnInit {

    photoURL: string;
    profile: Profile;

    @ViewChild(ImageInputComponent) input: ImageInputComponent;

    constructor(
        public routerService: RouterStoreDispatcher,
        public profileService: ProfileStoreDispatcher,
    ) {}

    ngOnInit(): void {
        this.initAvatar();
    }

    async initAvatar() {
        const router = await this.routerService.selectState().pipe(first()).toPromise();
        const routeID = router.state.params.id;
        let profile: Profile;
        if (routeID) {
            profile = await this.profileService.selectProfile(routeID).pipe(first(p => p != null)).toPromise();
        } else {
            profile = await this.profileService.selectUserAsProfile().pipe(first(p => p != null)).toPromise();
        }
        this.profile = profile;
        this.photoURL = profile.photoURL;
    }


    getAvatar(): string {
        return this.profileService.getInitialsAvatar(this.profile);
    }

    changeAvatar() {
        this.profileService.update(this.profile.id, {'photoURL': this.photoURL});
    }

    onFileUploaded(event: any) {
        this.photoURL = event;
    }

    clearInput() {
        this.photoURL = null;
        this.input.clear();
    }
}
