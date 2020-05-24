import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateWorkoutPageRoutingModule } from './create-workout-routing.module';

import { CreateWorkoutPage } from './create-workout.page';
import { MaterialsModule } from '../materials.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialsModule,
        IonicModule,
        CreateWorkoutPageRoutingModule
    ],
    'declarations': [CreateWorkoutPage]
})
export class CreateWorkoutPageModule {}
