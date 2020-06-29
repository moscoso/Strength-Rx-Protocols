import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisePreviewComponent } from './exercise-preview/exercise-preview.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { MaterialsModule } from '../materials.module';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        MaterialsModule,
        SharedModule,
    ],
    'declarations': [ExercisePreviewComponent, ExerciseFormComponent, CreateExerciseComponent, EditExerciseComponent, ],
    'exports': [
        ExerciseFormComponent,
        ExercisePreviewComponent,
    ]
})
export class ExerciseModule {}
