import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { Exercise, INIT_EXERCISE } from '../../state/exercises/exercises.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { transformToSlug } from 'src/util/slug/transformToSlug';

@Injectable({'providedIn': FirebaseModule, })
export class ExerciseService extends EntityService < Exercise > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'exercises');
        this.setDefaultEntity(INIT_EXERCISE);
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be a slug of the exercise name.
     * @param exercise the exercise entity being created
     */
    async create(exercise: Exercise): Promise < Exercise > {
        const docID = transformToSlug(exercise.name);
        const doc = await this.firestore.doc(`exercises/${docID}`).ref.get();
        if (doc.exists) {
            throw new Error(`Exercise of ID ${docID} already exists`);
        }
        await this.entityCollection.doc(`${docID}`).set(exercise);
        return exercise;
    }
}
