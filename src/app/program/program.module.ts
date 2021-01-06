import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { WorkoutModule } from '../workout/workout.module';
import { CopyWorkoutComponent } from './components/program-form/copy-workout/copy-workout.component';
import { CreateCustomWorkoutComponent } from './components/program-form/create-custom-workout/create-custom-workout.component';
import { EditCustomWorkoutComponent } from './components/program-form/edit-custom-workout/edit-custom-workout.component';
import { ProgramFormComponent } from './components/program-form/program-form.component';
import { SubscribeToWorkoutComponent } from './components/program-form/subscribe-to-workout/subscribe-to-workout.component';
import { ProgramPreviewComponent } from './components/program-preview/program-preview.component';



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
