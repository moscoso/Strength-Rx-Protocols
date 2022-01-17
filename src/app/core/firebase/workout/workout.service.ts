import { Injectable } from '@angular/core';
import { EntityService } from '../entity/EntityService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseModule } from '../firebase.module';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { WORKOUT_INIT_MODEL, Workout } from '../../state/workout/workout.model';

@Injectable({'providedIn': FirebaseModule, })
export class WorkoutService extends EntityService<Workout> {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'workouts', {'defaultEntity': WORKOUT_INIT_MODEL, 'IDSource': 'name'});
    }
}
