import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UpdateRequested } from 'src/app/core/state/profile/profile.actions';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';

@Component({
    'selector': 'app-edit-profile',
    'templateUrl': './edit-profile.page.html',
    'styleUrls': ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

    constructor(
        public profileService: ProfileStoreDispatcher,
        public store: Store
    ) {}

    ngOnInit() {}

    onSubmit(profile) {
        this.profileService.update(profile.id, profile);
    }
}
