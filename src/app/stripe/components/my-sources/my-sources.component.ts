import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
    'selector': 'my-sources',
    'templateUrl': './my-sources.component.html',
    'styleUrls': ['./my-sources.component.scss'],
})
export class MySourcesComponent {

    constructor(
        public functions: AngularFireFunctions
    ) {}

    getSources() {
        const fun = this.functions.httpsCallable('stripeGetSources');
        const x = fun({});
        x.subscribe(y => console.log(y));
    }
}
