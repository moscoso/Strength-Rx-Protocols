import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';

@Component({
    'selector': 'billing-portal',
    'templateUrl': './billing-portal.component.html',
    'styleUrls': ['./billing-portal.component.scss'],
})
export class BillingPortalComponent {

    loading = false;

    constructor(
        public auth: AuthFacade,
        public functions: AngularFireFunctions
    ) {}

    async createBillingPortalLink() {
        const userID = await this.auth.getUserID();
        const fun = this.functions.httpsCallable('stripeCreateBillingPortalLink');
        return fun({
            userID,
            // 'returnURL':
        }).toPromise().then(response => {
            return response;
        });
    }

    async manageBilling() {
        this.loading = true;
        const session = await this.createBillingPortalLink();
        this.loading = false;
        window.location = session.url;
    }
}
