import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFoodPageRoutingModule } from './create-food-routing.module';

import { CreateFoodPage } from './create-food.page';
import { MaterialsModule } from 'src/app/materials.module';

@NgModule({
    'imports': [
        CommonModule,
        MaterialsModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        CreateFoodPageRoutingModule
    ],
    'declarations': [CreateFoodPage]
})
export class CreateFoodPageModule {}
