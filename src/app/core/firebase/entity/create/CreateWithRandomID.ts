import { CreateMechanism } from './CreateMechanism';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

/**
 * This creation mechanism creates an automatically generated random Firebase ID for each new document.
 */
export class CreateWithRandomID < T > implements CreateMechanism < T > {

    /**
     * Constructs a  creation mechanism that creates an automatically generated random Firebase ID for each new document.
     */
    constructor(
        public entityCollection: AngularFirestoreCollection < T >,
    ) {
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the automatically generated document Firebase ID.
     * @param entity the entity being created
     */
    async create(entity: T): Promise < T > {
        const randomID = this.generateRandomID();
        await this.entityCollection.doc(randomID).set({...entity, ...{'id': randomID}});
        return entity;
    }

    generateRandomID() {
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var randomID = randLetter + Date.now();
        return randomID;
    }
}
