import { Component, OnInit } from '@angular/core';

@Component({
    'selector': 'upload-image',
    'templateUrl': './upload-image.component.html',
    'styleUrls': ['./upload-image.component.scss'],
})
export class UploadImageComponent {


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
