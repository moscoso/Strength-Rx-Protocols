import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProfilePageRoutingModule } from './create-profile-routing.module';

import { CreateProfilePage } from './create-profile.page';
import { MaterialsModule } from '../materials.module';

@NgModule({
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        MaterialsModule,
        FormsModule,
        IonicModule,
        CreateProfilePageRoutingModule
    ],
    'declarations': [CreateProfilePage]
})
export class CreateProfilePageModule {}
