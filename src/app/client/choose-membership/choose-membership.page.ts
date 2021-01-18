import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { first } from 'rxjs/operators';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
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
        private routerService: RouterStoreDispatcher,
        private functions: AngularFireFunctions,
        private firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.fetchPrices().then(() => {
            this.fetchRoute();
        })
    }



    async fetchRoute() {
        const state = await this.routerService.selectState().pipe(first()).toPromise()
        console.log(state);
        const planLength = state.state.queryParams.planLength;
        if (planLength != null && planLength !== 'undefined') { this.planLength = planLength };
        const planType = state.state.queryParams.planType;
        console.log('bark', planLength, planType);
        if (planType != null && planType !== 'undefined') { this.choosePlan(planType); }
    }

    async fetchPrices() {
        const x = await this.firestore.doc(`products/stripe_subscriptions`).get().pipe(first()).toPromise();
        this.plans = x.data().plans;
        return;
    }

    segmentChanged(e) {
        this.planLength = e.detail.value;
    }

    choosePlan(type: 'general' | 'powerlift' | 'contest') {
        this.chosenPlanType = type;
        this.chosenPlanID = this.plans[type][this.planLength].priceID;
    }

    getPrice(type: any): number {
        const planType = this.plans[type];
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
            fun({ 'priceID': this.chosenPlanID, 'hostURL': environment.hostURL }).toPromise().then(response => {
                console.log(response);
                const stripe = Stripe(environment.stripePK);
                const options: stripe.StripeServerCheckoutOptions = { 'sessionId': response.id };
                stripe.redirectToCheckout(options);
            }).catch(error => {
                console.error(error);
                this.checkoutLoading = false;
            })
            this.checkoutLoading = true;
        } else {
            console.warn(`Cannot checkout with undefined plan ID`);
        }

    }

    goBack() {
        this.chosenPlanID = null;
    }
}
