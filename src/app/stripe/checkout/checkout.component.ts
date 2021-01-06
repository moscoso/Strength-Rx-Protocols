import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';
import { first } from 'rxjs/operators';

declare var StripeCheckout; // StripeCheckoutStatic;

@Component({
    'selector': 'app-checkout',
    'templateUrl': './checkout.component.html',
    'styleUrls': ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    constructor(
        private auth: AuthStoreDispatcher,
        private functions: AngularFireFunctions
    ) {}

    @Input() amount;
    @Input() description;

    checkout: any;

    confirmation: any;
    loading = false;

    stripe: stripe.Stripe;

    ngOnInit() {
        this.checkout = StripeCheckout.configure({
            'key': 'pk_live_T6qB2lI9q51daLjTsDEX5tPX00Hzpq5PY3',
            'image': '/assets/icon/logo-square.png',
            'locale': 'auto',
            'source': async (source) => {
                this.loading = true;
                const userID = await this.auth.getUserID();
                const fun = this.functions.httpsCallable('stripeCreateCharge');
                this.confirmation = await fun({ 'source': source.id, 'uid': userID, 'amount': this
                            .amount })
                    .toPromise();
                this.loading = false;

            }
        });
    }

    // Open the checkout handler
    async openCheckout(e) {
        const user = await this.auth.selectUserData().pipe(first(data => data != null)).toPromise();
        this.checkout.open({
            'name': 'Strength Rx Protocols',
            'description': this.description,
            'amount': this.amount,
            'email': user.email,
        });
        e.preventDefault();
    }

    // Close on navigate
    @HostListener('window:popstate')
    onPopstate() {
        this.checkout.close();
    }

}
