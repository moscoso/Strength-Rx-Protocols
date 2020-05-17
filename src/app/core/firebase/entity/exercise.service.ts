import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { Exercise } from '../../state/exercises/exercises.state';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class ExerciseService extends EntityService<Exercise> {
    constructor(
        firestore: AngularFirestore,
    ) {
        super(firestore, 'exercises');
    }
}
