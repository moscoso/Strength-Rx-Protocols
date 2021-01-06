import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisePreviewComponent } from './components/exercise-preview/exercise-preview.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { MaterialsModule } from '../materials.module';
import { CreateExerciseComponent } from './components/create-exercise/create-exercise.component';
import { EditExerciseComponent } from './components/edit-exercise/edit-exercise.component';
import { SharedModule } from '../shared/shared.module';
import { HighlightSearchPipe } from '../pipes/highlight-search.pipe';
import { PipeModule } from '../pipes/pipe.module';


@NgModule({
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        MaterialsModule,
        SharedModule,
        PipeModule,
    ],
    'declarations': [
        ExercisePreviewComponent,
        ExerciseFormComponent,
        CreateExerciseComponent,
        EditExerciseComponent,
    ],
    'providers': [HighlightSearchPipe],
    'exports': [
        ExerciseFormComponent,
        ExercisePreviewComponent,
    ]
})
export class ExerciseModule {}
