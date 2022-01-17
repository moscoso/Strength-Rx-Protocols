import { Injectable } from '@angular/core';
import { EntityService } from '../entity/EntityService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseModule } from '../firebase.module';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Exercise, EXERCISE_INIT_MODEL } from '../../state/exercise/exercise.model';

@Injectable({'providedIn': FirebaseModule, })
export class ExerciseService extends EntityService < Exercise > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'exercises', {'defaultEntity': EXERCISE_INIT_MODEL, 'IDSource': 'name'});
    }
}
