import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseListPageRoutingModule } from './exercise-list-routing.module';

import { ExerciseListPage } from './exercise-list.page';
import { ExerciseModule } from '../exercise.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ExerciseModule,
        ExerciseListPageRoutingModule,
        SharedModule,
    ],
    'declarations': [ExerciseListPage]
})
export class ExerciseListPageModule {}
