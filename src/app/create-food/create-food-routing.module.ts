import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFoodPage } from './create-food.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFoodPageRoutingModule {}
