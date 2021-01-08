import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';
import { environment } from 'src/environments/environment';

declare var Stripe: stripe.StripeStatic;

@Component({
    'selector': 'app-elements',
    'templateUrl': './elements.component.html',
    'styleUrls': ['./elements.component.scss'],
})
export class ElementsComponent implements AfterViewInit {

    @Input() amount: number;
    @Input() description: string;
    @ViewChild('cardElement') cardElement: ElementRef;

    stripe: stripe.Stripe;
    card: stripe.elements.Element;
    cardErrors: any;

    loading = false;
    confirmation: any;

    constructor(
        private authService: AuthStoreDispatcher,
        private functions: AngularFireFunctions,
    ) {}

    ngAfterViewInit() {
        this.stripe = Stripe(environment.stripePK);
        const elements = this.stripe.elements();

        this.card = elements.create('card');
        this.card.mount(this.cardElement.nativeElement);

        this.card.addEventListener('change', ({error}) => {
            this.cardErrors = error && error.message;
        });
    }

    async handleForm(e) {
        e.preventDefault();

        const {source, error} = await this.stripe.createSource(this.card);
        if (error) {
            // Inform the customer that there was an error.
            const cardErrors = error.message;
        } else {
            // Send the token to your server.
            // this.charge(source);
            // this.attachSource(source);
            this.subscription(source);
        }
    }

    async attachSource(source: stripe.Source) {
        this.loading = true;
        const userID = await this.authService.getUserID();
        const fun = this.functions.httpsCallable('stripeCreateCharge');
        this.confirmation = await fun({'source': source.id}).toPromise();
        this.loading = false;
    }

    async charge(source: stripe.Source) {
        this.loading = true;
        const userID = await this.authService.getUserID();
        const fun = this.functions.httpsCallable('stripeCreateCharge');
        this.confirmation = await fun({'source': source.id, 'amount': this.amount}).toPromise();
        this.loading = false;
    }

    async subscription(source: stripe.Source) {
        this.loading = true;
        const userID = await this.authService.getUserID();
        const fun = this.functions.httpsCallable('stripeCreateSubscription');
        this.confirmation = await fun({'source': source.id, 'plan': 'price_1H2LZhCezgWh4f2jSudGs6zy'}).toPromise();
        this.loading = false;
    }
}
