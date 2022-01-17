import { Injectable } from '@angular/core';
import { EntityService } from '../entity/EntityService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseModule } from '../firebase.module';
import { Program, PROGRAM_INIT_MODEL } from '../../state/program/program.model';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({'providedIn': FirebaseModule, })
export class ProgramService extends EntityService<Program> {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'programs', {'defaultEntity': PROGRAM_INIT_MODEL, 'IDSource': 'name'});
    }
}
