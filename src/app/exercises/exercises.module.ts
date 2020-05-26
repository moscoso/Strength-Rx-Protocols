import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisesPageRoutingModule } from './exercises-routing.module';

import { ExercisesPage } from './exercises.page';
import { ExercisePreviewComponent } from './exercise-preview/exercise-preview.component';

@NgModule({
  'imports': [
    CommonModule,
    FormsModule,
    IonicModule,
    ExercisesPageRoutingModule
  ],
  'declarations': [ExercisesPage, ExercisePreviewComponent]
})
export class ExercisesPageModule {}
