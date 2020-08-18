import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';
import { StorageModule } from '../storage/storage.module';
import { SetAvatarComponent } from './set-avatar/set-avatar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    'declarations': [
        ProfileFormComponent,
        SetAvatarComponent,
    ],
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        MaterialsModule,
        StorageModule,
        SharedModule,
    ],
    'exports': [
        ProfileFormComponent,
        SetAvatarComponent,
    ]
})
export class ProfileModule {}
