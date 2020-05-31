import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

/**
 * The Default behavior to perform CRUD operations on an Entity in Firestore.
 * An entity will be saved as a document in the root level collection specified by collectionName"
 */
export abstract class EntityService < T > {

    protected entityCollection: AngularFirestoreCollection < T > ;
    entities: Observable < T[] > ;
    defaultEntity: T;

    constructor(
        firestore: AngularFirestore,
        collectionName: string,
    ) {
        this.entityCollection = firestore.collection < T > (collectionName);
        this.entities = this.entityCollection.valueChanges({ 'idField': 'id' });
    }

    /**
     * Retrieve all the entities of the Firestore collection as an array.
     * If the default Entity is set, it will provide default values for any missing
     * data fields for each entity.
     */
    async getAll(): Promise < T[] > {
        return this.entities.pipe(take(1), map((entities) => {
            if (!this.defaultEntity) {
                return entities;
            }

            const mappedEntities = [];
            entities.forEach(entity => {
                mappedEntities.push({ ...this.defaultEntity, ...entity});
            });
            return mappedEntities;
        })).toPromise();
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the automatically generated document Firebase ID.
     * @param entity the entity being created
     */
    async create(entity: T): Promise < T > {
        await this.entityCollection.add(entity);
        return entity;
    }

    /**
     * Update an entity's document in Firestore
     * @param entityID the ID of the entity that corresponds to the matching document ID in Firestore
     * @param entity the partial object that represents the entity data to update
     */
    async update(entityID: string, entity: Partial < T > ): Promise < void > {
        return this.entityCollection.doc(entityID).update(entity);
    }

    /**
     * Delete an entity's document in Firestore
     * @param entityID the ID of the entity that corresponds to the matching document ID in Firestore
     */
    async delete(entityID: string): Promise < void > {
        return this.entityCollection.doc(entityID).delete();
    }

    /**
     * Set the default entity for the service.
     * It will provide default values for missing data fields from Firestore documents.
     * @param entity the initialized values that serve as the default for every entity
     */
    setDefaultEntity(entity: T) {
        this.defaultEntity = entity;
    }
}
