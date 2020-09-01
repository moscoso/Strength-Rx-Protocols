import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
    'selector': 'subscription-status',
    'templateUrl': './subscription-status.component.html',
    'styleUrls': ['./subscription-status.component.scss'],
})
export class SubscriptionStatusComponent implements OnInit {

    subscription: any;

    constructor(
        public functions: AngularFireFunctions
    ) {}

    ngOnInit() {
        this.getSubscriptions();
    }

    getSubscriptions() {
        const fun = this.functions.httpsCallable('stripeGetSubscriptions');
        console.log('starting call');
        fun({}).toPromise().then(response => {
            const subscription = response.data[0];
            this.subscription = subscription;
        });
    }

    getDate(milliseconds: number) {
        const date = new Date(milliseconds * 1000);
        return date.toLocaleDateString();
    }

}
