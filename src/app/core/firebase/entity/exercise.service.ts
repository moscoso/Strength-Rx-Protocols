import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { Exercise } from '../../state/exercises/exercises.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';

@Injectable({
    'providedIn': FirebaseModule,
})
export class ExerciseService extends EntityService < Exercise > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'exercises');
    }

    async create(entity: Exercise): Promise < Exercise > {
        const doc = await this.firestore.doc(`exercises/${entity.name}`).ref.get();
        if (doc.exists) {
            throw new Error(`Exercises ${entity.name} already exists`);
        }
        await this.entityCollection.doc(`${entity.name}`).set(entity);
        return entity;
    }
}
