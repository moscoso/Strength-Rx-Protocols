import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInPageRoutingModule } from './check-in-routing.module';
import { CheckInPage } from './check-in.page';
import { CheckInModule } from '../check-in.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
    'imports': [
        CommonModule,
        CheckInModule,
        IonicModule,
        CheckInPageRoutingModule
    ],
    'declarations': [CheckInPage]
})
export class CheckInPageModule {}
