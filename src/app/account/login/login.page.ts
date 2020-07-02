import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';

@Component({
    'selector': 'app-login',
    'templateUrl': './login.page.html',
    'styleUrls': ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.maxLength(128)]);

    hidePassword = true;

    form: FormGroup;

    constructor(
        public authDispatch: AuthStoreDispatcher,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'email': this.email,
            'password': this.password,
        });
    }

    onSubmit(form) {
        this.authDispatch.login(form.email, form.password);
    }
}
