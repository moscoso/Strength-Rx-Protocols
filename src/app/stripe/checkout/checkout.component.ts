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

    handler: any;

    confirmation: any;
    loading = false;

    ngOnInit() {
        this.handler = StripeCheckout.configure({
            'key': 'pk_test_your_key',
            'image': '/your-avatar.png',
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
    async checkout(e) {
        const user = await this.auth.selectUserData().pipe(first(data => data != null)).toPromise();
        this.handler.open({
            'name': 'Fireship Store',
            'description': this.description,
            'amount': this.amount,
            'email': user.email,
        });
        e.preventDefault();
    }

    // Close on navigate
    @HostListener('window:popstate')
    onPopstate() {
        this.handler.close();
    }

}
