import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { ProfileModule } from '../profile.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    'imports': [
        CommonModule,
        IonicModule,
        ProfileModule,
        EditProfilePageRoutingModule,
        SharedModule,
    ],
    'declarations': [EditProfilePage]
})
export class EditProfilePageModule {}
