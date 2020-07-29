import { Component, OnInit } from '@angular/core';

@Component({
    'selector': 'app-choose-membership',
    'templateUrl': './choose-membership.page.html',
    'styleUrls': ['./choose-membership.page.scss'],
})
export class ChooseMembershipPage implements OnInit {


    plan = '3month';

    prices = {
        'general': {
            'monthly': 160,
            '3month': 460,
            '6month': 880,
        },
        'powerlift': {
            'monthly': 185,
            '3month': 540,
            '6month': 1050,
        },
        'contest': {
            'monthly': 225,
            '3month': 645,
            '6month': 1230,
        }
    };

    constructor() {}

    ngOnInit() {}

    segmentChanged(e) {
        this.plan = e.detail.value;
    }

    getPrice(type: string): number {
        return this.prices[type][this.plan];
    }

    getTimetable() {
        if (this.plan === '3month') {
            return '/ 3 months';
        } else if (this.plan === '6month') {
            return '/ 6 months';
        } else {
            return '/ month';
        }
    }
}
