import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditWorkoutPageRoutingModule } from './edit-workout-routing.module';

import { EditWorkoutPage } from './edit-workout.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkoutModule } from '../workout.module';

@NgModule({
    'imports': [
        CommonModule,
        IonicModule,
        SharedModule,
        WorkoutModule,
        EditWorkoutPageRoutingModule
    ],
    'declarations': [EditWorkoutPage]
})
export class EditWorkoutPageModule {}
