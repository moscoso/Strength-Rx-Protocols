import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignProgramComponent } from './assign-program/assign-program.component';
import { AssignTrainerComponent } from './assign-trainer/assign-trainer.component';
import { IonicModule } from '@ionic/angular';
import { MaterialsModule } from '../materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
    'declarations': [
        AssignProgramComponent,
        AssignTrainerComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        RouterModule,
        MaterialsModule,
        ReactiveFormsModule,
    ],
    'exports': [
        AssignProgramComponent,
        AssignTrainerComponent,
    ]
})
export class ClientModule {}
