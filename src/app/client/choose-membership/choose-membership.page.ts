import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
    'selector': 'app-choose-membership',
    'templateUrl': './choose-membership.page.html',
    'styleUrls': ['./choose-membership.page.scss'],
})
export class ChooseMembershipPage implements OnInit {


    planLength = '3month';

    chosenPlanType: string | null = null;
    chosenPlanID: string | null = null;

    plans = {
        'general': {
            'monthly': {
                'price': 160,
                'priceID': `price_1HMTC2CezgWh4f2jVtBeyKxK`
            },
            '3month': {
                'price': 460,
                'priceID': `price_1HMTC3CezgWh4f2j01PAPhpM`
            },
            '6month': {
                'price': 880,
                'priceID': `price_1HMTC2CezgWh4f2jkuNDMIgq`
            },
        },
        'powerlift': {
            'monthly': {
                'price': 185,
                'priceID': `price_1HMTDDCezgWh4f2jnmeATIB8`
            },
            '3month': {
                'price': 540,
                'priceID': `price_1HMTDECezgWh4f2j5uFbJslI`
            },
            '6month': {
                'price': 1050,
                'priceID': `price_1HMTDECezgWh4f2jmeP0qqv2`
            },
        },
        'contest': {
            'monthly': {
                'price': 225,
                'priceID': `price_1HMTDzCezgWh4f2jpX9pb7is`
            },
            '3month': {
                'price': 645,
                'priceID': `price_1HMTDzCezgWh4f2j75j7Rs5S`
            },
            '6month': {
                'price': 1230,
                'priceID': `price_1HMTDzCezgWh4f2jM4dE6IqW`
            },
        }
    };

    constructor(
        private functions: AngularFireFunctions
    ) {}

    ngOnInit() {}

    segmentChanged(e) {
        this.planLength = e.detail.value;
    }

    choosePlan(type: 'general' | 'powerlift' | 'contest') {
        this.chosenPlanType = type;
        this.chosenPlanID = this.plans[type][this.planLength].priceID;
        console.log(this.chosenPlanID);
    }

    getPrice(type: string): number {
        return this.plans[type][this.planLength].price;
    }

    getChosenPrice(): number {
        return this.getPrice(this.chosenPlanType);
    }

    getTimetable() {
        if (this.planLength === '3month') {
            return '/ 3 months';
        } else if (this.planLength === '6month') {
            return '/ 6 months';
        } else {
            return '/ month';
        }
    }

    getPeriod() {
        if (this.planLength === '3month') {
            return '3 months';
        } else if (this.planLength === '6month') {
            return '6 months';
        } else {
            return '1 month';
        }
    }

    checkout() {
        if (this.chosenPlanID !== null) {
            const fun = this.functions.httpsCallable('stripeCreateCheckoutSession');
            fun({ 'priceID': this.chosenPlanID }).toPromise().then(response => {
                console.log(response);
                const stripe = Stripe('pk_test_0kffL6wokyI4iGhZPXFIriPT');
                stripe.redirectToCheckout({ 'sessionId': response.id });
            });
        } else {
            console.warn(`Cannot checkout with undefined plan ID`);
        }

    }
}
