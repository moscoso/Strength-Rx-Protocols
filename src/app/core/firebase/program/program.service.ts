import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase.module';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { Program, INIT_PROGRAM } from '../../state/program/program.state';

@Injectable({'providedIn': FirebaseModule, })
export class ProgramService extends EntityService<Program> {
    constructor(
        public firestore: AngularFirestore,
    ) {
        super(firestore, 'programs');
        this.setDefaultEntity(INIT_PROGRAM);
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be a slug of the program name.
     * @param program the program entity being created
     */
    async create(program: Program): Promise < Program > {
        const docID = transformToSlug(program.name);
        const doc = await this.firestore.doc(`programs/${docID}`).ref.get();
        if (doc.exists) {
            throw new Error(`Program of ID ${docID} already exists`);
        }
        await this.entityCollection.doc(`${docID}`).set(program);
        return program;
    }
}
