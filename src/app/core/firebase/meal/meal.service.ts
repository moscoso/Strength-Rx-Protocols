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
        super(firestore, 'meals');
        this.setDefaultEntity(INIT_MEAL);
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the meal name.
     * @param meal the exercise entity being created
     */
    async create(meal: Meal): Promise < Meal > {
        const doc = await this.firestore.doc(`exercises/${meal.name}`).ref.get();
        if (doc.exists) {
            throw new Error(`Meals ${meal.name} already exists`);
        }
        await this.entityCollection.doc(`${meal.name}`).set(meal);
        return meal;
    }
}
