import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { Food, INIT_FOOD } from '../../state/food/food.state';

@Injectable({
    'providedIn': FirebaseModule,
})
export class FoodService extends EntityService < Food > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'foods', false);
        this.setDefaultEntity(INIT_FOOD);
    }
}
