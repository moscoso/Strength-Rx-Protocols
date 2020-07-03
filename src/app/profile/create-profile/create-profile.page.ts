import { Component, OnInit } from '@angular/core';

import { CreateRequested } from 'src/app/core/state/profile/profile.actions';
import { Store } from '@ngrx/store';


@Component({
    'selector': 'app-create-profile',
    'templateUrl': './create-profile.page.html',
    'styleUrls': ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {

    constructor(
        public store: Store,
    ) {}

    ngOnInit() {}

    onSubmit(profile) {
        this.store.dispatch(new CreateRequested(profile));
    }
}
