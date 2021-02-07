import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';

@Component({
    'selector': 'app-register',
    'templateUrl': './register.page.html',
    'styleUrls': ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]);
    confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]);

    hidePassword = true;

    form: FormGroup;

    constructor(
        public authDispatch: AuthFacade,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'email': this.email,
            'password': this.password,
            'confirmPassword': this.confirmPassword,
        }, {'validators': this.checkPasswords });
    }

    onSubmit(form) {
        this.authDispatch.signup(form.email, form.password);
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
