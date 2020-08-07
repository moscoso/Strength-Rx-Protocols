import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { Food, INIT_FOOD } from '../../state/food/food.state';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
    'providedIn': FirebaseModule,
})
export class FoodService extends EntityService < Food > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'foods', {'defaultEntity': INIT_FOOD, 'IDSource': 'name'});
    }
}
