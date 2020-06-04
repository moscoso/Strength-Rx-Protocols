import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealPage } from './meal.page';

const routes: Routes = [
  {
    path: '',
    component: MealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealPageRoutingModule {}
