import { Injectable } from '@angular/core';
import { EntityService } from '../entity/EntityService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseModule } from '../firebase.module';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { CheckIn, CHECK_IN_INIT_MODEL } from '../../state/check-in/check-in.model';

@Injectable({
    'providedIn': FirebaseModule,
})
export class CheckInService extends EntityService < CheckIn > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'check-ins', {'defaultEntity': CHECK_IN_INIT_MODEL, 'IDSource': 'random'});
    }
}
