import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';
import { Profile, ClientApplicationStatus } from '../core/state/profile/profile.state';
import { CreateRequested } from '../core/state/profile/profile.actions';
import { take } from 'rxjs/operators';
import * as fromAuth from '../core/state/auth/auth.selector';

@Component({
    'selector': 'app-create-profile',
    'templateUrl': './create-profile.page.html',
    'styleUrls': ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {

    form: FormGroup;
    requestInProgress$: Observable < boolean > ;

    firstName = new FormControl('', Validators.required);
    lastName = new FormControl('', Validators.required);
    sex = new FormControl('', Validators.required);
    birthday = new FormControl('', Validators.required);
    feet = new FormControl('', [Validators.required, Validators.min(3), Validators.max(7)]);
    inches = new FormControl('', [Validators.required, Validators.min(0), Validators.max(11)]);
    constructor(private store: Store) {

    }

    ngOnInit() {
        this.form = new FormGroup({
            'firstName': this.firstName,
            'lastName': this.lastName,
            'sex': this.sex,
            'birthday': this.birthday,
            'feet': this.feet,
            'inches': this.inches,
        });
        this.requestInProgress$ = this.store.select(
            (state: AppState) => state.profiles.requestInProgress
        );
    }

    async onSubmit(form) {
        const userID = await this.store.select(
            fromAuth.selectUserID
        ).pipe(take(1)).toPromise();

        const profile: Profile = {
            'id':  userID,
            'firstName': form.firstName,
            'lastName': form.lastName,
            'isClient': true,
            'isTrainer': false,
            'joined': new Date(),
            'photoURL': '',
            'sex': form.sex,
            'birthday': form.birthday,
            'height': {
                'feet': form.feet,
                'inches': form.inches
            },
            'assignedTrainerID': null,
            'assignedTrainerName': null,
            'clientApplicationStatus': ClientApplicationStatus.NOT_STARTED
        };
        this.store.dispatch(new CreateRequested(profile));
    }

}
