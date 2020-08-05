import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { Workout, INIT_WORKOUT } from '../../state/workouts/workouts.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';

@Injectable({'providedIn': FirebaseModule, })
export class WorkoutService extends EntityService<Workout> {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'workouts', false);
        this.setDefaultEntity(INIT_WORKOUT);
    }
}
