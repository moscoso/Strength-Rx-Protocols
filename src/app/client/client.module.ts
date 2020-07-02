import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignProgramComponent } from './assign-program/assign-program.component';
import { AssignTrainerComponent } from './assign-trainer/assign-trainer.component';



@NgModule({
    'declarations': [
        AssignProgramComponent,
        AssignTrainerComponent,
    ],
    'imports': [
        CommonModule
    ],
    'exports': [
        AssignProgramComponent,
        AssignTrainerComponent,
    ]
})
export class ClientModule {}
