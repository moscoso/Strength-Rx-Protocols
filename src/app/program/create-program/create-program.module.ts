import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProgramPageRoutingModule } from './create-program-routing.module';

import { CreateProgramPage } from './create-program.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgramModule } from '../program.module';
import { MaterialsModule } from 'src/app/materials.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        ProgramModule,
        MaterialsModule,
        CreateProgramPageRoutingModule
    ],
    'declarations': [CreateProgramPage]
})
export class CreateProgramPageModule {}
