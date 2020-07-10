import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutDetailPageRoutingModule } from './workout-detail-routing.module';

import { WorkoutDetailPage } from './workout-detail.page';
import { ExerciseModule } from 'src/app/exercise/exercise.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ExerciseModule,
        WorkoutDetailPageRoutingModule
    ],
    'declarations': [WorkoutDetailPage]
})
export class WorkoutDetailPageModule {}
