import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { Program, INIT_PROGRAM } from '../../state/program/program.state';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({'providedIn': FirebaseModule, })
export class ProgramService extends EntityService<Program> {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'programs', {'defaultEntity': INIT_PROGRAM, 'IDSource': 'name'});
    }
}
