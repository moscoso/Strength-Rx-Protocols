import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsPageRoutingModule } from './reviews-routing.module';

import { ReviewsPage } from './reviews.page';
import { StorageModule } from '../storage/storage.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ReviewsPageRoutingModule,
        StorageModule,
    ],
    'declarations': [ReviewsPage]
})
export class ReviewsPageModule {}
