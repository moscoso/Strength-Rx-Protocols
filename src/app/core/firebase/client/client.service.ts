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

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the client name.
     * @param client the client entity being created
     */
    async create(client: Client): Promise < Client > {
        const doc = await this.firestore.doc(`clients/${client.id}`).ref.get();
        if (doc.exists) {
            throw new Error(`Clients ${client.id} already exists`);
        }
        await this.entityCollection.doc(`${client.id}`).set(client);
        return client;
    }
}
