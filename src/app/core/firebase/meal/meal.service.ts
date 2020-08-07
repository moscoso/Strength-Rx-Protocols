import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { Meal, INIT_MEAL } from '../../state/meals/meals.state';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
    'providedIn': FirebaseModule,
})
export class MealService extends EntityService < Meal > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'meals', {'defaultEntity': INIT_MEAL, 'IDSource': 'name'});
    }
}
