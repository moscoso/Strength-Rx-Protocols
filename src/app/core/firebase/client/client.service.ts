import { Injectable } from '@angular/core';
import { FirebaseModule } from '../firebase.module';
import { EntityService } from '../entity/EntityService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Client, CLIENT_INIT_MODEL } from '../../state/client/client.model';

@Injectable({ 'providedIn': FirebaseModule, })
export class ClientService extends EntityService < Client > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'clients', {'defaultEntity': CLIENT_INIT_MODEL, 'IDSource': 'authorizedUser'});
    }
}
