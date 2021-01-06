import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ElementsComponent } from './components/elements/elements.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BuySubscriptionComponent } from './components/buy-subscription/buy-subscription.component';
import { MyChargesComponent } from './components/my-charges/my-charges.component';
import { MySourcesComponent } from './components/my-sources/my-sources.component';
import { CancelSubscriptionComponent } from './components/cancel-subscription/cancel-subscription.component';
import { BillingPortalComponent } from './components/billing-portal/billing-portal.component';
import { SubscriptionStatusComponent } from './components/subscription-status/subscription-status.component';



@NgModule({
    'declarations': [
        CheckoutComponent,
        ElementsComponent,
        BuySubscriptionComponent,
        MyChargesComponent,
        MySourcesComponent,
        BillingPortalComponent,
        SubscriptionStatusComponent,
        CancelSubscriptionComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        FormsModule,
    ],
    'exports': [
        CheckoutComponent,
        ElementsComponent,
        BuySubscriptionComponent,
        MyChargesComponent,
        MySourcesComponent,
        BillingPortalComponent,
        SubscriptionStatusComponent,
        CancelSubscriptionComponent,
    ]
})
export class StripeModule {}
