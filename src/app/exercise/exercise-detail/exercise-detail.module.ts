import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseDetailPageRoutingModule } from './exercise-detail-routing.module';

import { ExerciseDetailPage } from './exercise-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExerciseModule } from '../exercise.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        ExerciseModule,
        ExerciseDetailPageRoutingModule
    ],
    'declarations': [ExerciseDetailPage]
})
export class ExerciseDetailPageModule {}
