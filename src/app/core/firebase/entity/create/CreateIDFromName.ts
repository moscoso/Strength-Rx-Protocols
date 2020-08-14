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
    ) {}

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be a slug of the entity name.
     * @param entity the entity being created
     */
    async create(entity: any): Promise < T > {
        if (!entity.name) {
            throw new Error(`Cannot create an entity with ID from name because name does not exist`);
        }
        const slugID = transformToSlug(entity.name);
        const doc = await this.entityCollection.doc(`${slugID}`).ref.get();
        if (doc.exists) {
            throw new Error(`Entity of document ID ${slugID} already exists in Firestore`);
        }
        await this.entityCollection.doc(`${slugID}`).set({...entity, ...{'id': slugID}});
        return entity;
    }
}
