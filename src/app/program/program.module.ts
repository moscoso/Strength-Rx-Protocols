import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramFormComponent } from './program-form/program-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';
import { ProgramPreviewComponent } from './program-preview/program-preview.component';
import { SubscribeToWorkoutComponent } from './program-form/subscribe-to-workout/subscribe-to-workout.component';
import { CreateCustomWorkoutComponent } from './program-form/create-custom-workout/create-custom-workout.component';
import { CopyWorkoutComponent } from './program-form/copy-workout/copy-workout.component';
import { SharedModule } from '../shared/shared.module';
import { WorkoutModule } from '../workout/workout.module';
import { EditCustomWorkoutComponent } from './program-form/edit-custom-workout/edit-custom-workout.component';



@NgModule({
    'declarations': [
        ProgramFormComponent,
        ProgramPreviewComponent,
        SubscribeToWorkoutComponent,
        CreateCustomWorkoutComponent,
        CopyWorkoutComponent,
        EditCustomWorkoutComponent,
    ],
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        MaterialsModule,
        IonicModule,
        SharedModule,
        WorkoutModule,
    ],
    'exports': [
        ProgramFormComponent,
        ProgramPreviewComponent,
        SubscribeToWorkoutComponent,
        CreateCustomWorkoutComponent,
        CopyWorkoutComponent,
        EditCustomWorkoutComponent,
    ]
})
export class ProgramModule {}
