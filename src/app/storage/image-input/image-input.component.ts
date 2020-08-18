import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    'selector': 'image-input',
    'templateUrl': './image-input.component.html',
    'styleUrls': ['./image-input.component.scss'],
})
export class ImageInputComponent {

    @ViewChild('myInput') input: ElementRef;
    @Input() storageFolder = 'test';
    @Output() fileUpload = new EventEmitter();

    file: File;

    onChange(files: any) {
        if (files.target.files && files.target.files[0]) {
            this.file = files.target.files[0];
        }
    }

    onFileUpload(event: any) {
        this.fileUpload.emit(event);
    }

    clear() {
        this.file = undefined;
        this.input.nativeElement.value = '';
    }
}
