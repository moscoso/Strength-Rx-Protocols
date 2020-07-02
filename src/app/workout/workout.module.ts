import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutPreviewComponent } from './workout-preview/workout-preview.component';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
    'declarations': [
        WorkoutFormComponent, WorkoutPreviewComponent
    ],
    'imports': [
        CommonModule,
        IonicModule,
        MaterialsModule,
        ReactiveFormsModule,
    ],
    'exports': [
        WorkoutFormComponent, WorkoutPreviewComponent
    ]
})
export class WorkoutModule {}
