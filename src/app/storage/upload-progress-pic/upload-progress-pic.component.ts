import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { first, finalize } from 'rxjs/operators';

@Component({
    'selector': 'upload-progress-pic',
    'templateUrl': './upload-progress-pic.component.html',
    'styleUrls': ['./upload-progress-pic.component.scss'],
})
export class UploadProgressPicComponent implements OnInit {

    @Input() file: File;

    @Input() isImage = false;

    @Input() storageFolder = 'profile_pic';

    @Output() fileUpload = new EventEmitter();

    task: AngularFireUploadTask;

    percentage: Observable < number > ;
    snapshot: Observable < any > ;
    downloadURL: string;

    constructor(
        private storage: AngularFireStorage,
        private firestore: AngularFirestore,
        private profileService: ProfileStoreDispatcher,
    ) {}

    ngOnInit() {
        this.startUpload();
    }

    async startUpload() {

        const profile = await this.profileService.selectUserProfile().pipe(first()).toPromise();


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
                this.downloadURL = await ref.getDownloadURL().toPromise();
                this.firestore.collection('files').add({ 'downloadURL': this.downloadURL, path });
                const client = await this.profileService.selectUserProfile().pipe(first()).toPromise();
                const data = {'downloadURL': this.downloadURL, 'dateCreated': new Date()};
                this.firestore.collection(`clients/${client.id}/progress-pics`).add(data);
                this.fileUpload.emit(this.downloadURL);
            }),
        );
    }

    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

    onDrop(files: any) {
        if (files.target.files && files.target.files[0]) {
            this.file = files.target.files[0];
        }
    }

}
