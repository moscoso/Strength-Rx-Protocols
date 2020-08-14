import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize, first } from 'rxjs/operators';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';

@Component({
    'selector': 'upload-review',
    'templateUrl': './upload-review.component.html',
    'styleUrls': ['./upload-review.component.scss'],
})
export class UploadReviewComponent implements OnInit {

    @Input() file: File;

    @Input() isImage = false;

    @Input() storageFolder = 'review_video';

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
        this.profileService.loadAll();
        this.startUpload();
    }

    async startUpload() {

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
                console.log('cool');
                const profile = await this.profileService.selectUserProfile().pipe(first()).toPromise();
                console.log('not cool', profile);
                this.firestore.collection(`clients/${profile.id}/reviews`).add({'downloadURL': this.downloadURL});
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
            this.startUpload();
        }
    }

}
