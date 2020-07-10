import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignProgramComponent } from './assign-program/assign-program.component';
import { AssignTrainerComponent } from './assign-trainer/assign-trainer.component';
import { IonicModule } from '@ionic/angular';
import { MaterialsModule } from '../materials.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    'declarations': [
        AssignProgramComponent,
        AssignTrainerComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        MaterialsModule,
        ReactiveFormsModule,
    ],
    'exports': [
        AssignProgramComponent,
        AssignTrainerComponent,
    ]
})
export class ClientModule {}
