import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

export abstract class EntityService < T > {

    protected entityCollection: AngularFirestoreCollection < T > ;
    entities: Observable < T[] > ;

    constructor(
        firestore: AngularFirestore,
        collectionName: string,
    ) {
        this.entityCollection = firestore.collection < T > (collectionName);
        this.entities = this.entityCollection.valueChanges({ 'idField': 'id' });
    }

    /**
     * Retrieve all the entities of the Firestore collection as an array
     */
    async getAll(): Promise < T[] > {
        return this.entities.pipe(take(1)).toPromise();
    }

    /**
     * Create a new Firestore document for the entity
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
    async update(entityID: string, entity: Update < T > ): Promise < void > {
        return this.entityCollection.doc(entityID).update(entity);
    }

    /**
     * Delete an entity's document in Firestore
     * @param entityID the ID of the entity that corresponds to the matching document ID in Firestore
     */
    async delete(entityID: string): Promise < void > {
        return this.entityCollection.doc(entityID).delete();
    }
}
