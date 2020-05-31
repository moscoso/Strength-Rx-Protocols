import { Injectable } from '@angular/core';
import { FirebaseModule } from '../firebase.module';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile, INIT_PROFILE } from '../../state/profile/profile.state';

@Injectable({ 'providedIn': FirebaseModule, })
export class ProfileService extends EntityService < Profile > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'profiles');
        this.setDefaultEntity(INIT_PROFILE);
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the profile name.
     * @param profile the profile entity being created
     */
    async create(profile: Profile): Promise < Profile > {
        const doc = await this.firestore.doc(`profiles/${profile.id}`).ref.get();
        if (doc.exists) {
            throw new Error(`Profiles ${profile.id} already exists`);
        }
        await this.entityCollection.doc(`${profile.id}`).set(profile);
        return profile;
    }
}
