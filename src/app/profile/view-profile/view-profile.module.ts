import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProfilePageRoutingModule } from './view-profile-routing.module';

import { ViewProfilePage } from './view-profile.page';
import { ProfileModule } from '../profile.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfileModule,
        ViewProfilePageRoutingModule
    ],
    'declarations': [ViewProfilePage]
})
export class ViewProfilePageModule {}