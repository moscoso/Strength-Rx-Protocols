import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot, DocumentData } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';
import { CreateStrategy } from './create/CreateStrategy';
import {
    EntityServiceOptions,
    DEFAULT_ENTITY_SERVICE_OPTIONS as DEFAULT_OPTIONS,
    IDCreateBehavior
} from './EntityServiceOptions';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { CreateStrategyFactory } from './create/CreateStrategyFactory';

/**
 * This service implements the default behavior to perform CRUD operations on an `Entity` in Firestore.
 * An entity is any singular, identifiable, and separate object, modeled to a certain type.
 * Entities make use of plain JavaScript objects when managing collections.
 * The entity will be saved as a document in the root level of Firestore specified by `collectionName`
 */
export abstract class EntityService < T > {

    /**
     * A reference to the collection in Firestore
     */
    private entityCollection: AngularFirestoreCollection < T > ;
    /**
     * Options to configure the Entity Service
     */
    private options: EntityServiceOptions < T > ;
    /**
     * the strategy used when creating an entity and storing it in Firebase
     */
    private creationStrategy: CreateStrategy < T > ;

    constructor(
        protected firestore: AngularFirestore,
        protected functions: AngularFireFunctions,
        private collectionName: string,
        options ?: EntityServiceOptions < T > ,
    ) {
        this.options = options ? { ...DEFAULT_OPTIONS, ...options } : DEFAULT_OPTIONS;
        this.entityCollection = firestore.collection < T > (collectionName);
        this.setCreationStrategy(this.options.IDSource);
    }

    /**
     * Retreive an entity
     * @param entityID the ID that corresponds to the entity's document in Firebase
     * @param source describes whether we should get from server or cache.
     */
    public async get(entityID: string, source: Source = 'default'): Promise < T > {
        const snapshot = await this.entityCollection.doc(entityID).get({ source })
            .pipe(first()).toPromise();
        const data = snapshot.data();
        if (data == null) {
            const errorMessage = `Document "${this.collectionName}/${entityID}" does not exist. Source: ${source}`;
            throw new Error(errorMessage);
        }
        return this.wrangleIntoEntity(data);
    }

    /**
     * Retrieve multiple entities at once
     */
    public async getMultiple(entityIDs: string[], source: Source = 'default'): Promise < EntityMap < T > > {
        const entities: EntityMap < T > = new Map();
        entityIDs.forEach(async (id) => {
            this.get(id, source).then(entity => {
                entities.set(id, entity);
            });
        });
        return entities;
    }

    /**
     * Retrieve all the entities as objects from the Firestore collection.
     */
    async getAll(): Promise < T[] > {
        const entities: T[] = await this.entityCollection.valueChanges({ 'idField': 'id' })
            .pipe(first()).toPromise();
        return entities.map(this.wrangleIntoEntity.bind(this));
    }

    /**
     * Retreive all entities by forcing Firestore to avoid the cache,
     * generating an error if the server cannot be reached.
     */
    async getAllFromServer(): Promise < T[] > {
        const snapshot: QuerySnapshot < DocumentData > = await this.entityCollection
            .get({ 'source': 'server' }).pipe(first()).toPromise();
        return snapshot.docs.map((doc: DocumentData) => {
            const entity = doc.data();
            return this.wrangleIntoEntity(entity);
        });
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the automatically generated document Firebase ID.
     * @param entity the entity being created
     */
    async create(entity: T): Promise < T > {
        await this.creationStrategy.create(entity);
        return entity;
    }

    /**
     * Sets the stategy for creating entities
     * @param IDSource describes how the ID will be created
     */
    setCreationStrategy(IDSource: IDCreateBehavior) {
        this.creationStrategy = CreateStrategyFactory.make(IDSource, this.entityCollection, this.functions, this.collectionName);
    }

    /**
     * Update an entity's document in Firestore
     * @param entityID the ID of the entity that corresponds to the matching document ID in Firestore
     * @param changes the partial object that represents the changes to the entity data
     */
    async update(entityID: string, changes: Partial < any > ): Promise < Partial < any > > {
        const nameIsID = this.options.IDSource === 'name';
        if (nameIsID && changes.name) {
            return this.updateAndMoveDocument(entityID, changes.name, changes);
        } else {
            await this.entityCollection.doc(entityID).update(changes);
            return changes;
        }
    }

    /**
     * Update an entity and the data to a new document.
     * This fails if there is already an existing document at the new ID.
     * @param entityID the ID of the entity that corresponds to the matching document ID in Firestore
     * @param newID the new document ID to set the document in Firestore
     * @param changes the partial object that represents the changes to the entity data
     */
    private async updateAndMoveDocument(entityID: string, newID: string, changes: Partial < T > ): Promise < Partial < T >> {
        return this.firestore.firestore.runTransaction(async (transaction) => {
            const newSlugID = transformToSlug(newID);
            const newRef = this.firestore.doc(`${this.collectionName}/${newSlugID}`).ref;
            const newDoc = await transaction.get(newRef);
            if (newDoc.exists) {
                throw new Error(
                    `UpdateAndMove failed. Document at ${this.collectionName}/${newSlugID} already exists.`);
            }
            const oldRef = this.firestore.doc(`${this.collectionName}/${entityID}`).ref;
            const oldDoc = await transaction.get(oldRef);
            if (!oldDoc.exists) {
                throw new Error(`UpdateAndMove failed. Cannot find entity at ${this.collectionName}/${oldDoc.ref.id}`);
            }
            const currentData = oldDoc.data() as any;
            transaction.set(newRef, { ...currentData, ...changes, ...{ 'id': newSlugID } });
            transaction.delete(oldRef);
            return changes;
        });
    }

    /**
     * Delete an entity's document in Firestore by moving the data to the `"deleted"` collection
     * @param entityID the ID of the entity that corresponds to the matching document ID in Firestore
     */
    async delete(entityID: string): Promise < void > {
        return this.firestore.firestore.runTransaction(async (transaction) => {
            const ref = this.firestore.doc(`${this.collectionName}/${entityID}`).ref;
            const doc = await transaction.get(ref);
            const entityData = doc.data();
            const recycleBinPath = `deleted/${this.collectionName}/deleted`;
            const recycleBinRef = this.firestore.collection(recycleBinPath).doc(this.firestore.createId()).ref;
            transaction.set(recycleBinRef, entityData);
            transaction.delete(ref);
        });
    }

    /**
     * Wrangling (or munging) is taking the "raw" json data stored in the Firestore
     * and transforming it into the form of an Entity
     *
     * @param data an Object containing all fields of a Firestore document
     */
    protected wrangleIntoEntity(data: any): T {
        let entity = this.addDefaults(data);
        entity = this.transformTimestamps(entity);
        return entity;
    }

    /**
     * Adds default Entity values (if they are preset) to any missing properties of the data.
     *
     * @note if defaultEntity is configured to null, it just returns the data as is
     * @param data the object to transform
     */
    protected addDefaults(data: any): T {
        const defaultEntity = this.options.defaultEntity;
        if (defaultEntity) {
            return { ...defaultEntity, ...data };
        } else {
            return { ...(data as T) };
        }
    }

    /**
     * Finds all properties that are Firebase Timestamps and transforms them into Javascript Dates
     * @param data the object to transform
     */
    protected transformTimestamps(data: any): T {
        const entity = { ...data };
        for (const property of Object.keys(entity)) {
            const isTimestamp = typeof entity[property]?.toDate === 'function';
            if (isTimestamp) {
                entity[property] = entity[property].toDate();
            }
        }
        return entity;
    }
}

/**
 * The EntityMap has unique identifiers as keys which are mapped to the value which is an Entity
 */
type EntityMap < T > = Map < string, T > ;
/**
 * Describes whether we should get from server or cache.
 *
 * Setting to `default` causes Firestore to try to retrieve an
 * up-to-date (server-retrieved) snapshot, but fall back to returning cached data
 * if the server can't be reached.
 *
 * Setting to `server` causes Firestore to avoid the cache, generating an error if the server
 * cannot be reached. Note that the cache will still be updated if the server request succeeds.
 * Also note that latency-compensation still takes effect, so any pending write operations will
 * be visible in the returned data (merged into the server-provided data).
 *
 * Setting to `cache` causes Firestore to immediately return a value from the cache,
 * ignoring the server completely (implying that the returned value may be stale with
 * respect to the value on the server.) If there is no data in the cache to satisfy
 * the get() call, DocumentReference.get() will return an error and QuerySnapshot.get()
 * will return an empty QuerySnapshot with no documents.
 */
type Source = 'default' | 'server' | 'cache';
