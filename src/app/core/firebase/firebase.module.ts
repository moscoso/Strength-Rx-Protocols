import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
    'declarations': [],
    'imports': [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        // AngularFirestoreModule.enablePersistence({'synchronizeTabs': true}),
    ],
    'providers': []
})
export class FirebaseModule {
    constructor() {
        const invalidStorageBucket = environment.firebase.storageBucket == null || environment.firebase.storageBucket === '';
        if(invalidStorageBucket) {
            console.error(`No Storage Bucket defined in Firebase Options. Storage upload services will fail`)
        }
    }
}
