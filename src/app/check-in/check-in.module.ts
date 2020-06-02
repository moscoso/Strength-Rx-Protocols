import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckInPageRoutingModule } from './check-in-routing.module';

import { CheckInPage } from './check-in.page';
import { MaterialsModule } from '../materials.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialsModule,
        IonicModule,
        CheckInPageRoutingModule
    ],
    'declarations': [CheckInPage]
})
export class CheckInPageModule {}
