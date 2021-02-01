import { Component } from '@angular/core';


@Component({
    'selector': 'app-check-in',
    'templateUrl': './check-in.page.html',
    'styleUrls': ['./check-in.page.scss'],
})
export class CheckInPage {

    type: 'weight' | 'weekly' = 'weight'

    constructor() {

    }

    segmentChanged(e) {
        this.type = e.detail.value
    }
}
