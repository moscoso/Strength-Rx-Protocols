import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { Workout, INIT_WORKOUT } from '../../state/workouts/workouts.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { transformToSlug } from 'src/util/slug/transformToSlug';

@Injectable({'providedIn': FirebaseModule, })
export class WorkoutService extends EntityService<Workout> {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'workouts');
        this.setDefaultEntity(INIT_WORKOUT);
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be a slug of the workout name.
     * @param workout the workout entity being created
     */
    async create(workout: Workout): Promise < Workout > {
        const docID = transformToSlug(workout.name);
        const doc = await this.firestore.doc(`workouts/${docID}`).ref.get();
        if (doc.exists) {
            throw new Error(`Workout of ID ${docID} already exists`);
        }
        await this.entityCollection.doc(`${docID}`).set(workout);
        return workout;
    }
}
