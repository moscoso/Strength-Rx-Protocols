import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ExerciseService } from './entity/exercise.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
    'declarations': [],
    'imports': [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence(),
    ],
    'providers': [
        AuthService,
        ExerciseService,
    ]
})
export class FirebaseModule {}
