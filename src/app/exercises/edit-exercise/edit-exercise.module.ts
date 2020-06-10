import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExercisePageRoutingModule } from './edit-exercise-routing.module';

import { EditExercisePage } from './edit-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExercisePageRoutingModule
  ],
  declarations: [EditExercisePage]
})
export class EditExercisePageModule {}
