import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMealPageRoutingModule } from './create-meal-routing.module';

import { CreateMealPage } from './create-meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMealPageRoutingModule
  ],
  declarations: [CreateMealPage]
})
export class CreateMealPageModule {}
