import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignProgramComponent } from './components/assign-program/assign-program.component';
import { AssignTrainerComponent } from './components/assign-trainer/assign-trainer.component';
import { IonicModule } from '@ionic/angular';
import { MaterialsModule } from '../materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgramModule } from '../program/program.module';
import { ProgressPicListComponent } from './components/progress-pic-list/progress-pic-list.component';
import { PipeModule } from '../pipes/pipe.module';
import { CheckInListComponent } from '../check-in/check-in-list/check-in-list.component';
import { CreateCustomProgramComponent } from './components/assign-program/create-custom-program/create-custom-program.component';
import { EditCustomProgramComponent } from './components/assign-program/edit-custom-program/edit-custom-program.component';
import { SubscribeToProgramComponent } from './components/assign-program/subscribe-to-program/subscribe-to-program.component';
import { SharedModule } from '../shared/shared.module';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ChatModule } from '../chat/chat.module';


@NgModule({
    'declarations': [
        AssignProgramComponent,
        AssignTrainerComponent,
        ProgressPicListComponent,
        CheckInListComponent,
        CreateCustomProgramComponent,
        EditCustomProgramComponent,
        SubscribeToProgramComponent,
        ReviewListComponent
    ],
    'imports': [
        CommonModule,
        IonicModule,
        ChatModule,
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
        ProgressPicListComponent,
        ReviewListComponent
    ],
})
export class ClientModule {}
