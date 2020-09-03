import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressPicsPageRoutingModule } from './progress-pics-routing.module';

import { ProgressPicsPage } from './progress-pics.page';
import { StorageModule } from '../storage/storage.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ProgressPicsPageRoutingModule,
        StorageModule,
    ],
    'declarations': [ProgressPicsPage]
})
export class ProgressPicsPageModule {}
