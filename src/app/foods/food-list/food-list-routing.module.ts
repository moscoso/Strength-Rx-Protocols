import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodsListPage } from './food-list.page';

const routes: Routes = [
{
    'path': '',
    'component': FoodsListPage,
},
{
    'path': ':id',
    'loadChildren': () => import('../food-detail/food-detail.module').then(m => m
        .FoodDetailPageModule)
}, ];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class FoodsListPageRoutingModule {}
