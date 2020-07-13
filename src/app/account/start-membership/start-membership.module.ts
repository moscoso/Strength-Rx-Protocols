import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartMembershipPageRoutingModule } from './start-membership-routing.module';

import { StartMembershipPage } from './start-membership.page';
import { StripeModule } from 'src/app/stripe/stripe.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        StripeModule,
        StartMembershipPageRoutingModule
    ],
    'declarations': [StartMembershipPage]
})
export class StartMembershipPageModule {}
