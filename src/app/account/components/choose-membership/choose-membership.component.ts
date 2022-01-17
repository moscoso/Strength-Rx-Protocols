import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';

@Component({
    'selector': 'choose-membership',
    'templateUrl': './choose-membership.component.html',
    'styleUrls': ['./choose-membership.component.scss'],
})
export class ChooseMembershipComponent implements OnInit {

    planLength = 'monthly';

    chosenPlanType: string | null = null;
    chosenPlanID: string | null = null;

    checkoutLoading = false;

    plans;

    @Output() membershipChosen = new EventEmitter();

    constructor(
        private firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.fetchPrices();
    }

    async fetchPrices() {
        const x = await this.firestore.doc(`products/stripe_subscriptions`).get().pipe(first()).toPromise();
        console.log(x.data());
        this.plans = (x.data() as any).plans;
    }

    segmentChanged(e) {
        this.planLength = e.detail.value;
    }

    choosePlan(type: 'general' | 'powerlift' | 'contest') {
        this.chosenPlanType = type;
        this.chosenPlanID = this.plans[type][this.planLength].priceID;
        this.membershipChosen.emit({
            'planType': type,
            'planLength': this.planLength
        });
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

}
