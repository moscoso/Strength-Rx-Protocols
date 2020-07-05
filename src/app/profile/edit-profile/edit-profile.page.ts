import { Component, OnInit } from '@angular/core';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';

@Component({
    'selector': 'app-edit-profile',
    'templateUrl': './edit-profile.page.html',
    'styleUrls': ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

    constructor(
        public profileService: ProfileStoreDispatcher,
    ) {}

    ngOnInit() {}

    onSubmit(profile) {
        this.profileService.update(profile.id, profile);
    }
}
