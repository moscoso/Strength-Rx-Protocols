import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneDirective } from './dropzone.directive';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
    'imports': [
        CommonModule,
        NgxFileDropModule,
    ],
    'declarations': [DropzoneDirective]
})
export class StorageModule {}
