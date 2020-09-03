import { Component } from '@angular/core';

@Component({
    'selector': 'upload-progress-image',
    'templateUrl': './upload-progress-image.component.html',
    'styleUrls': ['./upload-progress-image.component.scss'],
})
export class UploadProgressImageComponent {

    files: File[] = [];

    onDrop(files: any) {
        if (files.target.files && files.target.files[0]) {
            this.files.push(files.target.files[0]);
        }
    }

}
