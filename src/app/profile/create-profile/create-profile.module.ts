import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProfilePageRoutingModule } from './create-profile-routing.module';
import { CreateProfilePage } from './create-profile.page';
import { ProfileModule } from '../profile.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
    'imports': [
        CommonModule,
        IonicModule,
        ProfileModule,
        CreateProfilePageRoutingModule
    ],
    'declarations': [CreateProfilePage]
})
export class CreateProfilePageModule {}
