import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { HomeModule } from '../home.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeModule,
        SharedModule,
        LandingPageRoutingModule
    ],
    'declarations': [LandingPage],
})
export class LandingPageModule {}
