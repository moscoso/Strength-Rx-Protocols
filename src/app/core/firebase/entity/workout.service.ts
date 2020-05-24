import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { Workout } from '../../state/workouts/workouts.state';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class WorkoutService extends EntityService<Workout> {
    constructor(
        firestore: AngularFirestore,
    ) {
        super(firestore, 'workouts');
    }
}
