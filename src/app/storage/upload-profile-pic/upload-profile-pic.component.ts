import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, first } from 'rxjs/operators';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';

@Component({
    'selector': 'upload-profile-pic',
    'templateUrl': './upload-profile-pic.component.html',
    'styleUrls': ['./upload-profile-pic.component.scss'],
})
export class UploadProfilePicComponent implements OnInit {

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
        private profileService: ProfileFacade,
    ) {}

    ngOnInit() {
        this.startUpload();
    }

    async startUpload() {

        const profile = await this.profileService.selectUserAsProfile().pipe(first()).toPromise();


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
                this.firestore.doc(`profiles/${profile.id}`).update({'photoURL': this.downloadURL});
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
