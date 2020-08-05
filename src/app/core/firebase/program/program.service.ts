import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { Program, INIT_PROGRAM } from '../../state/program/program.state';

@Injectable({'providedIn': FirebaseModule, })
export class ProgramService extends EntityService<Program> {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'programs', false);
        this.setDefaultEntity(INIT_PROGRAM);
    }
}
