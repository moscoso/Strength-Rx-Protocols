import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntervalExerciseListComponent } from './interval-exercise-list/interval-exercise-list.component';
import { IonicModule } from '@ionic/angular';
import { CountdownModule } from 'ngx-countdown';
import { IntervalCountdownComponent } from './interval-countdown/interval-countdown.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    'declarations': [
        IntervalCountdownComponent,
        IntervalExerciseListComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        SharedModule,
        RouterModule,
        CountdownModule,
    ],
    'exports': [
        IntervalExerciseListComponent,
        IntervalCountdownComponent,
    ]
})
export class IntervalTimerModule {}
