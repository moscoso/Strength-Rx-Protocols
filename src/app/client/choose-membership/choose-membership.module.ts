import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseMembershipPageRoutingModule } from './choose-membership-routing.module';

import { ChooseMembershipPage } from './choose-membership.page';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ChooseMembershipPageRoutingModule
    ],
    'declarations': [ChooseMembershipPage]
})
export class ChooseMembershipPageModule {}
