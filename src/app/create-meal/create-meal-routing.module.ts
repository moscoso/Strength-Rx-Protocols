import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMealPage } from './create-meal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMealPageRoutingModule {}
