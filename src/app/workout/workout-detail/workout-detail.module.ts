import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutDetailPageRoutingModule } from './workout-detail-routing.module';

import { WorkoutDetailPage } from './workout-detail.page';
import { ExerciseModule } from 'src/app/exercise/exercise.module';
import { IntervalTimerModule } from 'src/app/interval-timer/interval-timer.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ExerciseModule,
        IntervalTimerModule,
        WorkoutDetailPageRoutingModule
    ],
    'declarations': [WorkoutDetailPage]
})
export class WorkoutDetailPageModule {}
