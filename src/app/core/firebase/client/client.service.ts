import { Injectable } from '@angular/core';
import { FirebaseModule } from '../firebase.module';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Client, INIT_CLIENT } from '../../state/client/client.state';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({ 'providedIn': FirebaseModule, })
export class ClientService extends EntityService < Client > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'clients', {'defaultEntity': INIT_CLIENT, 'IDSource': 'authorizedUser'});
    }
}
