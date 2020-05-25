import { Injectable } from '@angular/core';
import { FirebaseModule } from '../firebase.module';
import { EntityService } from './entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../state/profile/profile.state';

@Injectable({
    'providedIn': FirebaseModule,
})
export class ProfileService extends EntityService < Profile > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'profiles');
    }
}
