import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisesPageRoutingModule } from './exercises-routing.module';

import { ExercisesPage } from './exercises.page';
import { ExercisePreviewComponent } from './exercise-preview/exercise-preview.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { MaterialsModule } from '../materials.module';

@NgModule({
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        ExercisesPageRoutingModule,
        MaterialsModule,
    ],
    'declarations': [ExercisesPage, ExercisePreviewComponent, ExerciseFormComponent],
    'exports': [
        MaterialsModule,
        ExerciseFormComponent,
    ]
})
export class ExercisesPageModule {}
