import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWorkoutPageRoutingModule } from './create-workout-routing.module';

import { CreateWorkoutPage } from './create-workout.page';
import { WorkoutModule } from '../workout.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    'imports': [
        CommonModule,
        IonicModule,
        SharedModule,
        WorkoutModule,
        CreateWorkoutPageRoutingModule
    ],
    'declarations': [CreateWorkoutPage]
})
export class CreateWorkoutPageModule {}
