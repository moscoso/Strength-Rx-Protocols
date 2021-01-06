import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
    'selector': 'cancel-subscription',
    'templateUrl': './cancel-subscription.component.html',
    'styleUrls': ['./cancel-subscription.component.scss'],
})
export class CancelSubscriptionComponent implements AfterViewInit {

    subscription: any;

    constructor(
        public functions: AngularFireFunctions
    ) {}

    ngAfterViewInit() {
        this.getSubscriptions();
    }

    getSubscriptions() {
        const fun = this.functions.httpsCallable('stripeGetSubscriptions');
        fun({}).subscribe(response => {
            const subscription = response.data[0];
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
