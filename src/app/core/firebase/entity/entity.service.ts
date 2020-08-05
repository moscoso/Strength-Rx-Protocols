import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CreateMechanism } from './create/CreateMechanism';
import { CreateIDFromName } from './create/CreateIDFromName';
import { CreateWithRandomID } from './create/CreateWithRandomID';

/**
 * The Default behavior to perform CRUD operations on an Entity in Firestore.
 * An entity will be saved as a document in the root level collection specified by collectionName"
 */
export abstract class EntityService < T > {

    protected creationMechanism: CreateMechanism < T > ;
    protected entityCollection: AngularFirestoreCollection < T > ;
    entities: Observable < T[] > ;
    defaultEntity: T;

    constructor(
        protected firestore: AngularFirestore,
        protected collectionName: string,
        useRandomIDs: boolean = true,
        protected includeDocID: boolean = true,
    ) {
        this.entityCollection = firestore.collection < T > (collectionName);
        this.setCreationMechanism(useRandomIDs);
    }

    /**
     * Retreive an entity
     * @param entityID the ID that corresponds to the entity's document in Firebase
     */
    async get(entityID: string, source: 'default' | 'server' | 'cache' = 'default'): Promise < T > {
        const snapshot = await this.firestore.collection(this.collectionName).doc(entityID).get({source})
            .pipe(first()).toPromise();
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
     * Retrieve multiple entities
     */
    async getMultiple(entityIDs: string[], source: 'default' | 'server' | 'cache' = 'default'): Promise < Map <string, T > > {
        const entities: Map < string, T > = new Map();
        entityIDs.forEach(async (id) => {
            this.get(id, source).then(entity => {
                entities.set(id, entity);
            }).catch(reason => {
                entities.set(id, null);
            });
        });
        return entities;
    }

    /**
     * Retrieve all the entities from the Firestore collection.
     * If the default Entity is set, it will provide default values for any missing
     * data fields for each entity.
     */
    async getAll(): Promise < T[] > {
        const options = this.includeDocID ? { 'idField': 'id' } : {};
        const entities: T[] = await this.entityCollection.valueChanges(options)
            .pipe(first()).toPromise();
        if (!this.defaultEntity) {
            return entities;
        } else {
            const mappedEntities = [];
            entities.forEach(entity => {
                mappedEntities.push({ ...this.defaultEntity, ...entity });
            });
            return mappedEntities;
        }
    }

    /**
     * Retreive all entities by forcing Firestore to avoid the cache,
     * generating an error if the server cannot be reached.
     */
    async getAllFromServer(): Promise < T[] > {
        const snapshot: QuerySnapshot < DocumentData > = await this.firestore.collection(this.collectionName)
            .get({ 'source': 'server' }).pipe(first()).toPromise();
        return snapshot.docs.map((doc: DocumentData) => {
            const data: any = doc.data();
            if (!this.defaultEntity) {
                return data;
            }
            return { ...this.defaultEntity, ...data };
        });
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the automatically generated document Firebase ID.
     * @param entity the entity being created
     */
    async create(entity: T): Promise < T > {
        await this.creationMechanism.create(entity);
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

    /**
     * Sets the behavior for creating an entity and storing it in Firebase.
     * @param useRandomIDs if set to true the ID for the document will be randomly generated,
     * otherwise an ID will be created based on the Name of the entity
     */
    setCreationMechanism(useRandomIDs: boolean) {
        if (useRandomIDs) {
            this.creationMechanism = new CreateWithRandomID(this.entityCollection);
        } else {
            this.creationMechanism = new CreateIDFromName(this.entityCollection, this.firestore, this.collectionName);
        }
    }
}
