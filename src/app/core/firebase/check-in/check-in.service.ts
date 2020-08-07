import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { INIT_CHECK_IN, CheckIn } from '../../state/check-ins/check-in.state';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
    'providedIn': FirebaseModule,
})
export class CheckInService extends EntityService < CheckIn > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'check-ins', {'defaultEntity': INIT_CHECK_IN, 'IDSource': 'random'});
    }
}
