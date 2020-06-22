import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CreateFoodPageRoutingModule } from './create-food-routing.module';
import { CreateFoodPage } from './create-food.page';
import { FoodModule } from '../food.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    'imports': [
        CommonModule,
        FoodModule,
        IonicModule,
        FoodModule,
        SharedModule,
        CreateFoodPageRoutingModule
    ],
    'declarations': [CreateFoodPage]
})
export class CreateFoodPageModule {}
