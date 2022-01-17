import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';


@NgModule({
    'declarations': [],
    'imports': [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        // AngularFirestoreModule.enablePersistence({'synchronizeTabs': true}), // TODO: Enable Firestore cache
    ],
    'providers': []
})
export class FirebaseModule {
    constructor() {
        const invalidStorageBucket = environment.firebase.storageBucket == null || environment.firebase.storageBucket === '';
        if(invalidStorageBucket) {
            console.error(`No storageBucket defined in environment Firebase config object. Storage upload services will fail`)
        }
    }
}
