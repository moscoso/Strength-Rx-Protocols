import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UpdateRequested } from 'src/app/core/state/profile/profile.actions';

@Component({
    'selector': 'app-edit-profile',
    'templateUrl': './edit-profile.page.html',
    'styleUrls': ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

    constructor(
        public store: Store
    ) {}

    ngOnInit() {}

    onSubmit(profile) {
        this.store.dispatch(new UpdateRequested(profile.id, profile));
    }
}
