import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramDetailPageRoutingModule } from './program-detail-routing.module';

import { ProgramDetailPage } from './program-detail.page';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ProgramDetailPageRoutingModule
    ],
    'declarations': [ProgramDetailPage]
})
export class ProgramDetailPageModule {}
