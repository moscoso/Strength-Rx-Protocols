import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFoodPageRoutingModule } from './edit-food-routing.module';

import { EditFoodPage } from './edit-food.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FoodModule } from '../food.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FoodModule,
    EditFoodPageRoutingModule
  ],
  declarations: [EditFoodPage]
})
export class EditFoodPageModule {}
