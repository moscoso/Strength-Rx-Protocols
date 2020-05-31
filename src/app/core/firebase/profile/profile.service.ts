import { Injectable } from '@angular/core';
import { FirebaseModule } from '../firebase.module';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile, INIT_PROFILE } from '../../state/profile/profile.state';

@Injectable({'providedIn': FirebaseModule, })
export class ProfileService extends EntityService < Profile > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'profiles');
        this.setDefaultEntity(INIT_PROFILE);
    }
}
