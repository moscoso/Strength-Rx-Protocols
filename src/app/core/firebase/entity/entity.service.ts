import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

/**
 * The Default behavior to perform CRUD operations on an Entity in Firestore.
 * An entity will be saved as a document in the root level collection specified by collectionName"
 */
export abstract class EntityService < T > {

    protected entityCollection: AngularFirestoreCollection < T > ;
    entities: Observable < T[] > ;
    defaultEntity: T;

    constructor(
        protected firestore: AngularFirestore,
        protected collectionName: string,
        useDocID: boolean = true,
    ) {
        this.entityCollection = firestore.collection < T > (collectionName);
        if (useDocID) {
            this.entities = this.entityCollection.valueChanges({ 'idField': 'id' });
        } else {
            this.entities = this.entityCollection.valueChanges({});
        }
    }



    /**
     * Retreive an entity
     * @param entityID the ID that corresponds to the entity's document in Firebase
     */
    async get(entityID: string): Promise < T > {
        const snapshot = await this.firestore.collection(this.collectionName).doc(entityID).get().pipe(first())
            .toPromise();
        const data = snapshot.data();
        if (data == null) {
            const errorMessage =
                `Document data for ${this.collectionName} collection does not exist for id: ${entityID}`;
            throw new Error(errorMessage);
        } else {
            if (this.defaultEntity) {
                return { ...this.defaultEntity, ...data, ...{ 'id': entityID } };
            } else {
                throw new Error(`Default entity must be set before calling get() on EntityService`);
            }
        }
    }

    /**
     * Retrieve all the entities of the Firestore collection as an array.
     * If the default Entity is set, it will provide default values for any missing
     * data fields for each entity.
     */
    async getAll(): Promise < T[] > {
        return this.entities.pipe(first(), map((entities) => {
            if (!this.defaultEntity) {
                return entities;
            }
            const mappedEntities = [];
            entities.forEach(entity => {
                mappedEntities.push({ ...this.defaultEntity, ...entity });
            });
            return mappedEntities;
        })).toPromise();
    }

    async getAllFromServer(): Promise < T[] > {
        const snapshot: QuerySnapshot < DocumentData > = await this.firestore.collection(this.collectionName)
            .get({ 'source': 'server' }).pipe(first()).toPromise();
        return snapshot.docs.map((doc: DocumentData) => {
            const data: any = doc.data();
            if (!this.defaultEntity) {
                return data;
            }
            return {...this.defaultEntity, ...data};
        });
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
