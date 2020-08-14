import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DropzoneDirective } from './dropzone.directive';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UploaderComponent } from './uploader/uploader.component';
import { NgxFileDropModule } from 'ngx-file-drop';

import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FormsModule } from '@angular/forms';
import { UploadReviewComponent } from './upload-review/upload-review.component';
import { UploadProfilePicComponent } from './upload-profile-pic/upload-profile-pic.component';


@NgModule({
    'imports': [
        CommonModule,
        IonicModule,
        FormsModule,
        NgxFileDropModule,
        FileUploadModule
    ],
    'declarations': [
        DropzoneDirective,
        UploadVideoComponent,
        UploadTaskComponent,
        UploadImageComponent,
        UploadReviewComponent,
        UploadProfilePicComponent,
        UploaderComponent,
    ],
    'exports': [
        UploadVideoComponent,
        UploadImageComponent,
        UploadReviewComponent,
        UploadProfilePicComponent,
    ]
})
export class StorageModule {}
