import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProfilePageRoutingModule } from './view-profile-routing.module';

import { ViewProfilePage } from './view-profile.page';
import { ProfileModule } from '../profile.module';
import { AccountModule } from 'src/app/account/account.module';
import { ClientModule } from 'src/app/client/client.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        AccountModule,
        ClientModule,
        ProfileModule,
        ViewProfilePageRoutingModule
    ],
    'declarations': [ViewProfilePage]
})
export class ViewProfilePageModule {}
