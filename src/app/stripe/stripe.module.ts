import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ElementsComponent } from './elements/elements.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BuySubscriptionComponent } from './buy-subscription/buy-subscription.component';
import { MyChargesComponent } from './my-charges/my-charges.component';
import { MySourcesComponent } from './my-sources/my-sources.component';
import { CancelSubscriptionComponent } from './cancel-subscription/cancel-subscription.component';
import { BillingPortalComponent } from './billing-portal/billing-portal.component';
import { SubscriptionStatusComponent } from './subscription-status/subscription-status.component';



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
