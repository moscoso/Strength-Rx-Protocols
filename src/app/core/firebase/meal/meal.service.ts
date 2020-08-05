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
        super(firestore, 'meals', false);
        this.setDefaultEntity(INIT_MEAL);
    }
}
