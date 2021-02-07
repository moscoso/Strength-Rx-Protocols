import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';
import { Profile } from 'src/app/core/state/profile/profile.model';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
    'selector': 'join-form',
    'templateUrl': './join-form.component.html',
    'styleUrls': ['./join-form.component.scss'],
})
export class JoinFormComponent implements OnInit {

    @Output() formSubmit = new EventEmitter < Partial < Profile >> ();

    hidePassword = true;

    form: FormGroup;

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]);
    confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]);
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
            'email': this.email,
            'password': this.password,
            'firstName': this.firstName,
            'lastName': this.lastName,
            'sex': this.sex,
            'birthday': this.birthday,
            'feet': this.feet,
            'inches': this.inches,
            'goal': this.goal,
            'healthConditions': this.healthConditions,
        });
    }


    async onSubmit(form) {
        const profile = this.form.getRawValue();
        try {
            let values: any;
            values = {
                'email': profile.email,
                'password': profile.password,
                'firstName': profile.firstName,
                'lastName': profile.lastName,
                'isClient': true,
                'isTrainer': false,
                'joined': new Date().getTime(),
                'photoURL': '',
                'goal': profile.goal,
                'healthConditions': profile.healthConditions,
                'sex': profile.sex,
                'birthday': profile.birthday.getTime(),
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

    /**
     * If password and confirm password values do not match,
     * return an error map with the passwordMismatch property.
     *
     * Otherwise if they do match return null,
     * @param formGroup the form to validate
     */
    checkPasswords(formGroup: FormGroup): ValidationErrors | null {
        const password = formGroup.get('password').value;
        const confirmPassword = formGroup.get('confirmPassword').value;
        return password === confirmPassword ? null : { 'passwordMismatch': true };
    }

}
