import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseMembershipPageRoutingModule } from './choose-membership-routing.module';

import { ChooseMembershipPage } from './choose-membership.page';
import { StripeModule } from 'src/app/stripe/stripe.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ChooseMembershipPageRoutingModule,
        StripeModule,
    ],
    'declarations': [ChooseMembershipPage]
})
export class ChooseMembershipPageModule {}
