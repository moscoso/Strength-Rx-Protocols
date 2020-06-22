import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodsListPageRoutingModule } from './food-list-routing.module';

import { FoodsListPage } from './food-list.page';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        FoodsListPageRoutingModule
    ],
    'declarations': [FoodsListPage]
})
export class FoodsListPageModule {}
