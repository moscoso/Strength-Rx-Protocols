import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    'selector': 'app-choose-membership',
    'templateUrl': './choose-membership.page.html',
    'styleUrls': ['./choose-membership.page.scss'],
})
export class ChooseMembershipPage implements OnInit {


    planLength = 'monthly';

    chosenPlanType: string | null = null;
    chosenPlanID: string | null = null;

    checkoutLoading = false;

    plans;

    constructor(
        private functions: AngularFireFunctions,
        private firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.fetchPrices();
    }

    async fetchPrices() {
        const x = await this.firestore.doc(`products/stripe_subscriptions`).get().pipe(first()).toPromise();
        console.log(x.data());
        this.plans = x.data().plans;
    }

    segmentChanged(e) {
        this.planLength = e.detail.value;
    }

    choosePlan(type: 'general' | 'powerlift' | 'contest') {
        this.chosenPlanType = type;
        this.chosenPlanID = this.plans[type][this.planLength].priceID;
    }

    getPrice(type: any): number {
        return this.plans[type][this.planLength].price;
    }

    getChosenPrice(): number {
        if (this.chosenPlanType) {
            return this.getPrice(this.chosenPlanType);
        } else {
            return undefined;
        }
    }

    getTimetable() {
        if (this.planLength === '2week') {
            return '/ 2 weeks';
        } else {
            return '/ month';
        }
    }

    getPeriod() {
        if (this.planLength === '2week') {
            return '2 week';
        } else {
            return '1 month';
        }
    }

    checkout() {
        if (this.chosenPlanID !== null) {
            const fun = this.functions.httpsCallable('stripeCreateCheckoutSession');
            fun({ 'priceID': this.chosenPlanID }).toPromise().then(response => {
                console.log(response);
                const stripe = Stripe(environment.stripePK);
                stripe.redirectToCheckout({ 'sessionId': response.id });
            });
            this.checkoutLoading = true;
        } else {
            console.warn(`Cannot checkout with undefined plan ID`);
        }

    }

    goBack() {
        this.chosenPlanID = null;
    }
}
