import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComparisonComponent } from './image-comparison.component';


@NgModule({
    'declarations': [ImageComparisonComponent],
    'exports': [ImageComparisonComponent],
    'imports': [CommonModule]
})
export class ImageComparisonModule {}
