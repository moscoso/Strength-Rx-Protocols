import { Component } from '@angular/core';

@Component({
    'selector': 'upload-video',
    'templateUrl': './upload-video.component.html',
    'styleUrls': ['./upload-video.component.scss'],
})
export class UploadVideoComponent {
    files: File[] = [];

    constructor() {}

    onDrop(files: any) {
        if (files.target.files && files.target.files[0]) {
            this.files.push(files.target.files[0]);
        }
    }

}
