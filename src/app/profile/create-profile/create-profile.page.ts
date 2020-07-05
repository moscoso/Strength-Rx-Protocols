import { Component, OnInit } from '@angular/core';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';


@Component({
    'selector': 'app-create-profile',
    'templateUrl': './create-profile.page.html',
    'styleUrls': ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {

    constructor(
        public profileService: ProfileStoreDispatcher,
    ) {}

    ngOnInit() {}

    onSubmit(profile) {
        this.profileService.create(profile);
    }
}
