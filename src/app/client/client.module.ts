import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignProgramComponent } from './assign-program/assign-program.component';
import { AssignTrainerComponent } from './assign-trainer/assign-trainer.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
    'declarations': [
        AssignProgramComponent,
        AssignTrainerComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
    ],
    'exports': [
        AssignProgramComponent,
        AssignTrainerComponent,
    ]
})
export class ClientModule {}
