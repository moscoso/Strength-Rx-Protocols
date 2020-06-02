import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { Meal, INIT_MEAL } from '../../state/meals/meals.state';

@Injectable({
    'providedIn': FirebaseModule,
})
export class MealService extends EntityService < Meal > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'foods');
        this.setDefaultEntity(INIT_MEAL);
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the exercise name.
     * @param exercise the exercise entity being created
     */
    async create(exercise: Meal): Promise < Meal > {
        const doc = await this.firestore.doc(`exercises/${exercise.name}`).ref.get();
        if (doc.exists) {
            throw new Error(`Meals ${exercise.name} already exists`);
        }
        await this.entityCollection.doc(`${exercise.name}`).set(exercise);
        return exercise;
    }
}
