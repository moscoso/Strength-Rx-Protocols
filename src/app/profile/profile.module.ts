import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';
import { StorageModule } from '../storage/storage.module';

@NgModule({
    'declarations': [
        ProfileFormComponent,
    ],
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        MaterialsModule,
        StorageModule,
    ],
    'exports': [
        ProfileFormComponent
    ]
})
export class ProfileModule {}
