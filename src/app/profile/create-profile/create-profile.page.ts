import { Component } from '@angular/core';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';


@Component({
    'selector': 'app-create-profile',
    'templateUrl': './create-profile.page.html',
    'styleUrls': ['./create-profile.page.scss'],
})
export class CreateProfilePage {

    constructor(
        public profileService: ProfileFacade,
    ) {}

    onSubmit(profile) {
        this.profileService.create(profile);
    }
}
