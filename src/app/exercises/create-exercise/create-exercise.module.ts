import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExercisePageRoutingModule } from './create-exercise-routing.module';

import { CreateExercisePage } from './create-exercise.page';
import { MaterialsModule } from '../../materials.module';
import { ExercisesPageModule } from '../exercises.module';

@NgModule({
    'imports': [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialsModule,
        CreateExercisePageRoutingModule,
        ExercisesPageModule
    ],
    'declarations': [CreateExercisePage]
})
export class CreateExercisePageModule {}
