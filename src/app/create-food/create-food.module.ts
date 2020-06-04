import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFoodPageRoutingModule } from './create-food-routing.module';

import { CreateFoodPage } from './create-food.page';
import { MaterialsModule } from '../materials.module';

@NgModule({
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        MaterialsModule,
        CreateFoodPageRoutingModule
    ],
    'declarations': [CreateFoodPage]
})
export class CreateFoodPageModule {}
