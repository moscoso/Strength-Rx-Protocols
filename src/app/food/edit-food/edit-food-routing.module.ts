import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFoodPage } from './edit-food.page';

const routes: Routes = [
  {
    path: '',
    component: EditFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFoodPageRoutingModule {}
