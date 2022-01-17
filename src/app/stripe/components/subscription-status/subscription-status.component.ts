import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
    'selector': 'subscription-status',
    'templateUrl': './subscription-status.component.html',
    'styleUrls': ['./subscription-status.component.scss'],
})
export class SubscriptionStatusComponent implements OnInit {

    subscription: any;

    hasSubscription: boolean;

    constructor(
        public functions: AngularFireFunctions,
        public change: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.getSubscriptions();
    }

    getSubscriptions() {
        const fun = this.functions.httpsCallable('stripeGetSubscriptions');
        fun({}).toPromise().then(response => {
            this.hasSubscription = response.data.length > 0;
            const subscription = response.data[0];
            this.subscription = subscription;
            this.change.markForCheck();
        });
    }

    getDate(milliseconds: number) {
        const date = new Date(milliseconds * 1000);
        return date.toLocaleDateString();
    }

}
