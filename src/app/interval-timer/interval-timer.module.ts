import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntervalTimerPageRoutingModule } from './interval-timer-routing.module';

import { IntervalTimerPage } from './interval-timer.page';
import { CountdownModule } from 'ngx-countdown';
import { ExerciseModule } from '../exercise/exercise.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ExerciseModule,
        SharedModule,
        CountdownModule,
        IntervalTimerPageRoutingModule
    ],
    'declarations': [IntervalTimerPage]
})
export class IntervalTimerPageModule {}
