import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
    'declarations': [
        ProfileFormComponent,
    ],
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        MaterialsModule,
    ],
    'exports': [
        ProfileFormComponent
    ]
})
export class ProfileModule {}
