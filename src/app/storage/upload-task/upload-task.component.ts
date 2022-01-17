import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

@Component({
    'selector': 'upload-task',
    'templateUrl': './upload-task.component.html',
    'styleUrls': ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

    @Input() file: File;

    @Input() showImage = false;
    @Input() showVideo = false;

    @Input() storageFolder = 'test';

    @Output() fileUpload = new EventEmitter();

    task: AngularFireUploadTask;

    percentage: Observable < number > ;
    snapshot: Observable < any > ;
    downloadURL: string;

    constructor(
        private storage: AngularFireStorage,
        private firestore: AngularFirestore
    ) {}

    ngOnInit() {
        this.startUpload();
    }

    startUpload() {

        // The storage path
        const path = `${this.storageFolder}/${Date.now()}_${this.file.name}`;

        // Reference to storage bucket
        const ref = this.storage.ref(path);

        // The main task
        this.task = this.storage.upload(path, this.file);

        // Progress monitoring
        this.percentage = this.task.percentageChanges();

        this.snapshot = this.task.snapshotChanges().pipe(
            // The file's download URL
            finalize(async () => {
                const totalBytes = (await this.task).totalBytes;
                this.downloadURL = await ref.getDownloadURL().toPromise();
                this.firestore.collection('files').add({
                    'downloadURL': this.downloadURL,
                    path,
                    totalBytes,
                    'timestamp': new Date(),
                });
                this.fileUpload.emit(this.downloadURL);
            }),
        );
    }

    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

}
