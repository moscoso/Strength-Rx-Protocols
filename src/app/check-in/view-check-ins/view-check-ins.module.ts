import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewCheckInsPageRoutingModule } from './view-check-ins-routing.module';
import { ViewCheckInsPage } from './view-check-ins.page';
import { CheckInModule } from '../check-in.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewCheckInsPageRoutingModule,
        CheckInModule,
    ],
    'declarations': [ViewCheckInsPage]
})
export class ViewCheckInsPageModule {}
