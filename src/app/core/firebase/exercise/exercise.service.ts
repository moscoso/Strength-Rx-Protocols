import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { Exercise, INIT_EXERCISE } from '../../state/exercises/exercises.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({'providedIn': FirebaseModule, })
export class ExerciseService extends EntityService < Exercise > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'exercises', {'defaultEntity': INIT_EXERCISE, 'IDSource': 'name'});
    }
}
