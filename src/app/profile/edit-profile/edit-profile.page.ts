import { Component } from '@angular/core';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';

@Component({
    'selector': 'app-edit-profile',
    'templateUrl': './edit-profile.page.html',
    'styleUrls': ['./edit-profile.page.scss'],
})
export class EditProfilePage {

    constructor(
        public profileService: ProfileFacade,
    ) {}

    onSubmit(profile) {
        this.profileService.update(profile.id, profile);
    }
}
