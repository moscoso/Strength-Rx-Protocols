import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
    'selector': 'my-sources',
    'templateUrl': './my-sources.component.html',
    'styleUrls': ['./my-sources.component.scss'],
})
export class MySourcesComponent implements OnInit {

    constructor(
        public functions: AngularFireFunctions
    ) {}

    ngOnInit() {}


    getSources() {
        const fun = this.functions.httpsCallable('stripeGetSources');
        const x = fun({});
        x.subscribe(y => console.log(y));
    }
}
