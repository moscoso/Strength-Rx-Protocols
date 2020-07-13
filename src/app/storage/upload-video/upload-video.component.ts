import { Component, OnInit } from '@angular/core';

@Component({
    'selector': 'upload-video',
    'templateUrl': './upload-video.component.html',
    'styleUrls': ['./upload-video.component.scss'],
})
export class UploadVideoComponent {

    isHovering: boolean;

    files: File[] = [];

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    onDrop(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
    }

}
