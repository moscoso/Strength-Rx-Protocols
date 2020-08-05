import { Injectable } from '@angular/core';
import { FirebaseModule } from '../firebase.module';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Client, INIT_CLIENT } from '../../state/client/client.state';

@Injectable({ 'providedIn': FirebaseModule, })
export class ClientService extends EntityService < Client > {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'clients');
        this.setDefaultEntity(INIT_CLIENT);
    }
}
