import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
    'selector': 'cancel-subscription',
    'templateUrl': './cancel-subscription.component.html',
    'styleUrls': ['./cancel-subscription.component.scss'],
})
export class CancelSubscriptionComponent implements OnInit {

    subscription: any;

    constructor(
        public functions: AngularFireFunctions
    ) {}

    ngOnInit() {
        this.getSubscriptions();
    }

    getSubscriptions() {
        const fun = this.functions.httpsCallable('stripeGetSubscriptions');
        fun({}).subscribe(response => {
            const subscription = response.data[0];
            console.log(subscription);
            this.subscription = subscription;
        });
    }

    cancelSubscription() {
        const fun = this.functions.httpsCallable('stripeCancelSubscription');
        // this.confirmation = fun({});
        // this.confirmation.subscribe(x => console.log(x));
    }

    getDate(milliseconds: number) {
        const date = new Date(milliseconds * 1000);
        return date.toLocaleDateString();
    }
}
