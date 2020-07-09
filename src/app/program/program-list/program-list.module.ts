import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramListPageRoutingModule } from './program-list-routing.module';

import { ProgramListPage } from './program-list.page';
import { ProgramModule } from '../program.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ProgramModule,
        ProgramListPageRoutingModule
    ],
    'declarations': [ProgramListPage]
})
export class ProgramListPageModule {}
