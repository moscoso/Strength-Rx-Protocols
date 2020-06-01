import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { INIT_CHECK_IN, CheckIn } from '../../state/check-ins/check-in.state';

@Injectable({
    'providedIn': FirebaseModule,
})
export class CheckInService extends EntityService < CheckIn > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'check-in');
        this.setDefaultEntity(INIT_CHECK_IN);
    }
}
