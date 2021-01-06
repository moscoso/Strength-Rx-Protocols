import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntervalTimerPageRoutingModule } from './interval-timer-routing.module';

import { IntervalTimerPage } from './interval-timer.page';
import { CountdownModule } from 'ngx-countdown';
import { ExerciseModule } from '../../exercise/exercise.module';
import { SharedModule } from '../../shared/shared.module';
import { IntervalExerciseListComponent } from '../interval-exercise-list/interval-exercise-list.component';
import { IntervalTimerModule } from '../interval-timer.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ExerciseModule,
        SharedModule,
        CountdownModule,
        IntervalTimerPageRoutingModule,
        IntervalTimerModule,
    ],
    'declarations': [IntervalTimerPage],
    'exports': []
})
export class IntervalTimerPageModule {}
