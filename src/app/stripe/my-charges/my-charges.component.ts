import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
    'selector': 'my-charges',
    'templateUrl': './my-charges.component.html',
    'styleUrls': ['./my-charges.component.scss'],
})
export class MyChargesComponent implements OnInit {

    loading = true;
    charges: any[];

    constructor(
        private functions: AngularFireFunctions
    ) {}

    ngOnInit() {
        const fun = this.functions.httpsCallable('stripeGetCharges');
        fun({}).subscribe(x => {
            this.loading = false;
            this.charges = x.data;
        });
    }

    getDate(milliseconds: number) {
        const date = new Date(milliseconds * 1000);
        return date.toLocaleDateString();
    }

}
