import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
    'selector': 'app-join',
    'templateUrl': './join.page.html',
    'styleUrls': ['./join.page.scss'],
})
export class JoinPage {

    chosenPlan = null;

    constructor(
        public functions: AngularFireFunctions,
        public authService: AuthFacade,
        public toastService: ToastService,
    ) {}    

    async onSubmit(data) {
        const profile = Object.assign({}, data);
        console.log(profile);
        const password = profile.password;
        delete profile.password;
        const createUser = this.functions.httpsCallable('createUserAndProfile');
        createUser({profile, password}).toPromise().then(x => {
            console.log('chosenPlan', this.chosenPlan);
            this.authService.loginAsNewAccount(profile.email, password, this.chosenPlan);
        }).catch(error => {
            this.toastService.failed(`Please try again`, error.message);
        });
    }

    onChosen(e) {
        console.log(e);
        this.chosenPlan = e;
    }

    goBack() {
        this.chosenPlan = null;
    }
}
