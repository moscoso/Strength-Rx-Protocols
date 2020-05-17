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

    async getAll(): Promise < T[] > {
        return this.entities.pipe(take(1)).toPromise();
    }

    async create(entity: T): Promise < T > {
        await this.entityCollection.add(entity);
        return entity;
    }

    async update(entityID: string, entity: Update < T > ): Promise < void > {
        return this.entityCollection.doc(entityID).update(entity);
    }

    async delete(entityID: string): Promise < void > {
        return this.entityCollection.doc(entityID).delete();
    }
}
