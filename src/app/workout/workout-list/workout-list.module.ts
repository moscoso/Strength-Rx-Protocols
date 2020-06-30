import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutListPageRoutingModule } from './workout-list-routing.module';

import { WorkoutListPage } from './workout-list.page';
import { WorkoutModule } from '../workout.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        WorkoutModule,
        WorkoutListPageRoutingModule
    ],
    'declarations': [WorkoutListPage]
})
export class WorkoutListPageModule {}
