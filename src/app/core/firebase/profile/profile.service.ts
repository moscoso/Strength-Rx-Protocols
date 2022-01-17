import { Injectable } from '@angular/core';
import { FirebaseModule } from '../firebase.module';
import { EntityService } from '../entity/EntityService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { PROFILE_INIT_MODEL, Profile } from '../../state/profile/profile.model';

@Injectable({ 'providedIn': FirebaseModule, })
export class ProfileService extends EntityService < Profile > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'profiles', {'defaultEntity': PROFILE_INIT_MODEL, 'IDSource': 'authorizedUser'});
    }
}
