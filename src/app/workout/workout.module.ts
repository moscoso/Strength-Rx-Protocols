import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutPreviewComponent } from './workout-preview/workout-preview.component';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StandardPhaseFormComponent } from './workout-form/standard-phase-form/standard-phase-form.component';
import { IntervalPhaseFormComponent } from './workout-form/interval-phase-form/interval-phase-form.component';
import { IntervalTimerModule } from '../interval-timer/interval-timer.module';
import { WorkoutInfoComponent } from './workout-info/workout-info.component';
import { ExerciseModule } from '../exercise/exercise.module';
import { RouterModule } from '@angular/router';


@NgModule({
    'declarations': [
        WorkoutFormComponent,
        WorkoutPreviewComponent,
        StandardPhaseFormComponent,
        IntervalPhaseFormComponent,
        WorkoutInfoComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        MaterialsModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        IntervalTimerModule,
        ExerciseModule,
    ],
    'exports': [
        WorkoutFormComponent, WorkoutPreviewComponent, WorkoutInfoComponent
    ]
})
export class WorkoutModule {}
