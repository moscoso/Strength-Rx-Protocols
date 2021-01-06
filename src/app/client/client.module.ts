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
import { CreateCustomProgramComponent } from './assign-program/create-custom-program/create-custom-program.component';
import { EditCustomProgramComponent } from './assign-program/edit-custom-program/edit-custom-program.component';
import { SubscribeToProgramComponent } from './assign-program/subscribe-to-program/subscribe-to-program.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    'declarations': [
        AssignProgramComponent,
        AssignTrainerComponent,
        ProgressPicListComponent,
        CheckInListComponent,
        CreateCustomProgramComponent,
        EditCustomProgramComponent,
        SubscribeToProgramComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        RouterModule,
        MaterialsModule,
        ProgramModule,
        SharedModule,
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
