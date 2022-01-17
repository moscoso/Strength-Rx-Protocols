import { CreateStrategy } from './CreateStrategy';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { transformToSlug } from 'src/util/slug/transformToSlug';

/**
 * This strategy creates an ID based on the name of the entity
 */
export class CreateIDFromName < T > implements CreateStrategy < T > {

    constructor(
        protected entityCollection: AngularFirestoreCollection < T > ,
    ) {}

    /**
     * Create a new Firestore document for the entity.
     * @note the unique identifier of the entity will be a slug of the entity name.
     * @param entity the entity being created
     */
    async create(entity: any): Promise < T > {
        if (!entity.name) {
            throw new Error(`Cannot CreateIDFromName because name does not exist`);
        }
        const slugID = transformToSlug(entity.name);
        const doc = await this.entityCollection.doc(`${slugID}`).ref.get();
        if (doc.exists) {
            throw new Error(`Entity of document ID ${slugID} already exists at ${this.entityCollection.ref.path}`);
        }
        await this.entityCollection.doc(`${slugID}`).set({...entity, ...{'id': slugID}});
        return entity;
    }
}
