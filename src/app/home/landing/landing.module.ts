import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { HomeModule } from '../home.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeModule,
        LandingPageRoutingModule
    ],
    'declarations': [LandingPage],
})
export class LandingPageModule {}
