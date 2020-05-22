import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ExerciseService } from './entity/exercise.service';
import { AngularFirestoreModule } from '@angular/fire/firestore/firestore.module';


@NgModule({
    'declarations': [],
    'imports': [
        CommonModule,
        AngularFireModule.initializeApp({
            'apiKey': 'AIzaSyDvyIyV5SeiGc5VR9kNulMsRE4qnnkEYeA',
            'authDomain': 'strengthrx-protocols.firebaseapp.com',
            'databaseURL': 'https://strengthrx-protocols.firebaseio.com',
            'projectId': 'strengthrx-protocols',
            'storageBucket': 'strengthrx-protocols.appspot.com',
            'messagingSenderId': '71599561823',
            'appId': '1:71599561823:web:4bec2e15b7ee4ad547cfea',
            'measurementId': 'G-90WG2D041V'
        }),
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence(),
    ],
    'providers': [
        AuthService,
        ExerciseService,
    ]
})
export class FirebaseModule {}
