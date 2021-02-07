import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Profile } from 'src/app/core/state/profile/profile.model';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';

@Component({
    'selector': 'profile-form',
    'templateUrl': './profile-form.component.html',
    'styleUrls': ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {

    @Input() buttonText = 'Submit';
    @Output() formSubmit = new EventEmitter < Partial < Profile >> ();

    form: FormGroup;
    requestInProgress$: Observable < boolean > ;

    firstName = new FormControl('', Validators.required);
    lastName = new FormControl('', Validators.required);
    sex = new FormControl('', Validators.required);
    birthday = new FormControl('', Validators.required);
    goal = new FormControl('');
    healthConditions = new FormControl('');
    feet = new FormControl('', [Validators.required, Validators.min(3), Validators.max(7)]);
    inches = new FormControl('', [Validators.required, Validators.min(0), Validators.max(11)]);

    constructor(
        public profileService: ProfileStoreDispatcher,
        public authService: AuthStoreDispatcher,
        public toastService: ToastService,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'firstName': this.firstName,
            'lastName': this.lastName,
            'sex': this.sex,
            'birthday': this.birthday,
            'feet': this.feet,
            'inches': this.inches,
            'goal': this.goal,
            'healthConditions': this.healthConditions,
        });
        this.requestInProgress$ = this.profileService.selectRequestInProgress();
        this.profileService.selectUserAsProfile().pipe(first(profile => profile != null))
            .toPromise().then(this.initFormValues.bind(this));
    }

    initFormValues(profile: Profile) {
        this.firstName.setValue(profile.firstName);
        this.lastName.setValue(profile.lastName);
        this.sex.setValue(profile.sex);
        this.feet.setValue(profile.height.feet);
        this.inches.setValue(profile.height.inches);
        /* Birthday objects loaded from Firebase are actually Timestamps,
           while locally created Birthdays are just native javascript Dates */
        const isTimestamp = typeof profile.birthday.toDate === 'function';
        if (isTimestamp) {
            this.birthday.setValue(profile.birthday.toDate());
        } else {
            this.birthday.setValue(profile.birthday);
        }
    }

    async onSubmit(form) {
        const user = await this.authService.selectUserData().pipe(first()).toPromise();
        const profile = this.form.getRawValue();
        try {
            let values: Partial < Profile > ;
            values = {
                'id': user.uid,
                'email': user.email,
                'firstName': profile.firstName,
                'lastName': profile.lastName,
                'isClient': profile.isClient != null ? profile.isClient : true,
                'isTrainer': profile.isTrainer != null ? profile.isTrainer : false ,
                'joined': new Date(),
                'photoURL': '',
                'goal': profile.goal,
                'healthConditions': profile.healthConditions,
                'sex': profile.sex,
                'birthday': profile.birthday,
                'height': {
                    'feet': profile.feet,
                    'inches': profile.inches
                },
            };
            this.formSubmit.emit(values);
        } catch (error) {
            this.toastService.failed(`Could not submit profile`, error);
        }
    }
}
