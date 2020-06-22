import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FoodFormComponent } from './food-form/food-form.component';
import { MaterialsModule } from '../materials.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialsModule,
        IonicModule,
    ],
    'declarations': [
        FoodFormComponent,
    ],
    'exports': [
        FoodFormComponent,
    ]
})
export class FoodModule {}
