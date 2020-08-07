import { Injectable } from '@angular/core';
import { FirebaseModule } from '../firebase.module';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile, INIT_PROFILE } from '../../state/profile/profile.state';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({ 'providedIn': FirebaseModule, })
export class ProfileService extends EntityService < Profile > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'profiles', {'defaultEntity': INIT_PROFILE, 'IDSource': 'authorizedUser'});
    }
}
