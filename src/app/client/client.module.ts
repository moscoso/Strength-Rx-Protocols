import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignProgramComponent } from './assign-program/assign-program.component';
import { AssignTrainerComponent } from './assign-trainer/assign-trainer.component';
import { IonicModule } from '@ionic/angular';
import { MaterialsModule } from '../materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgramModule } from '../program/program.module';
import { ProgressPicListComponent } from './progress-pic-list/progress-pic-list.component';
import { PipeModule } from '../pipes/pipe.module';
import { CheckInListComponent } from '../check-in/check-in-list/check-in-list.component';



@NgModule({
    'declarations': [
        AssignProgramComponent,
        AssignTrainerComponent,
        ProgressPicListComponent,
        CheckInListComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        RouterModule,
        MaterialsModule,
        ProgramModule,
        ReactiveFormsModule,
        PipeModule,
    ],
    'exports': [
        AssignProgramComponent,
        AssignTrainerComponent,
        ProgressPicListComponent,
        CheckInListComponent,
    ],
})
export class ClientModule {}
