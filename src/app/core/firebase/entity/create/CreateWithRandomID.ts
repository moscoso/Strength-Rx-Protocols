import { CreateStrategy } from './CreateStrategy';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { generateRandomID } from 'src/util/randomID/randomID';


/**
 * This strategy creates a randomly generated ID for each new entity.
 */
export class CreateWithRandomID < T > implements CreateStrategy < T > {

    constructor(
        public entityCollection: AngularFirestoreCollection < T >,
    ) {}

    /**
     * Create a new Firestore document for the entity.
     * the unique identifier of the entity will be the automatically generated document Firebase ID.
     * @param entity the entity being created
     */
    async create(entity: T): Promise < T > {
        const randomID = generateRandomID();
        await this.entityCollection.doc(randomID).set({...entity, ...{'id': randomID}});
        return entity;
    }
}
