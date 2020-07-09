import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProgramPageRoutingModule } from './edit-program-routing.module';

import { EditProgramPage } from './edit-program.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgramModule } from '../program.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        ProgramModule,
        EditProgramPageRoutingModule
    ],
    'declarations': [EditProgramPage]
})
export class EditProgramPageModule {}
