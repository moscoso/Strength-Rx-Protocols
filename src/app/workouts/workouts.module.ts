import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsPageRoutingModule } from './workouts-routing.module';

import { WorkoutsPage } from './workouts.page';
import { WorkoutPreviewComponent } from './workout-preview/workout-preview.component';

@NgModule({
  'imports': [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsPageRoutingModule
  ],
  'declarations': [WorkoutsPage, WorkoutPreviewComponent]
})
export class WorkoutsPageModule {}
