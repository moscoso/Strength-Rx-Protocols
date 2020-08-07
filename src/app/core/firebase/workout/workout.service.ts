import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { Workout, INIT_WORKOUT } from '../../state/workouts/workouts.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({'providedIn': FirebaseModule, })
export class WorkoutService extends EntityService<Workout> {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'workouts', {'defaultEntity': INIT_WORKOUT, 'IDSource': 'name'});
    }
}
