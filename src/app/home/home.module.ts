import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ImageComparisonSliderComponent } from './image-comparison/image-comparison.component';

@NgModule({
    'declarations': [
        ImageComparisonSliderComponent
    ],
    'imports': [
        CommonModule,
        IonicModule,
        RouterModule,
    ],
    'exports': [
        ImageComparisonSliderComponent
    ],
    
})
export class HomeModule {}
