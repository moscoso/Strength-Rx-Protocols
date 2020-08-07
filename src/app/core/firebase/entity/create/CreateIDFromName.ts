import { CreateMechanism } from './CreateMechanism';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { transformToSlug } from 'src/util/slug/transformToSlug';

/**
 * This creation mechanism creates an ID based on the name of the entity
 */
export class CreateIDFromName < T > implements CreateMechanism < T > {

    /**
     * Constructs a creation mechanism that creates an ID based on the name of the entity
     */
    constructor(
        protected entityCollection: AngularFirestoreCollection < T > ,
        protected firestore: AngularFirestore,
        protected collectionName: string,
    ) {
        if (!firestore) {
            const errorMessage = `Cannot create CreateIDFromName mechanism because firestore is undefined`;
            throw new Error(errorMessage);
        }
        if (!collectionName || collectionName.length === 0) {
            const errorMessage = `Cannot create CreateIDFromName mechanism because collectionName ${collectionName} is undefined`;
            throw new Error(errorMessage);
        }
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be a slug of the entity name.
     * @param entity the entity being created
     */
    async create(entity: any): Promise < T > {
        const slugID = transformToSlug(entity.name);
        const doc = await this.firestore.doc(`${this.collectionName}/${slugID}`).ref.get();
        if (doc.exists) {
            throw new Error(`Entity of ID ${slugID} already exists`);
        }
        await this.entityCollection.doc(`${slugID}`).set({...entity, ...{'id': slugID}});
        return entity;
    }
}
