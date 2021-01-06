import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';

@Component({
    'selector': 'billing-portal',
    'templateUrl': './billing-portal.component.html',
    'styleUrls': ['./billing-portal.component.scss'],
})
export class BillingPortalComponent {

    constructor(
        public auth: AuthStoreDispatcher,
        public functions: AngularFireFunctions
    ) {}

    async createBillingPortalLink() {
        const userID = await this.auth.getUserID();
        const fun = this.functions.httpsCallable('stripeCreateBillingPortalLink');
        return fun({
            userID,
            'returnURL': undefined
        }).toPromise().then(response => {
            return response;
        });
    }

    async manageBilling() {
        const session = await this.createBillingPortalLink();
        window.location = session.url;
    }
}
