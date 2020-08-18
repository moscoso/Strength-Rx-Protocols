import { Component } from '@angular/core';

@Component({
    'selector': 'upload-image',
    'templateUrl': './upload-image.component.html',
    'styleUrls': ['./upload-image.component.scss'],
})
export class UploadImageComponent {

    files: File[] = [];

    onDrop(files: any) {
        if (files.target.files && files.target.files[0]) {
            this.files.push(files.target.files[0]);
        }
    }

}
