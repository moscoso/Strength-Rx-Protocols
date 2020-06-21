import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFoodPageRoutingModule } from './create-food-routing.module';

import { CreateFoodPage } from './create-food.page';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateFoodPageRoutingModule
    ],
    'declarations': [CreateFoodPage]
})
export class CreateFoodPageModule {}
