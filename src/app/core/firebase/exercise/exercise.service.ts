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
        super(firestore, 'exercises', false);
        this.setDefaultEntity(INIT_EXERCISE);
    }
}
