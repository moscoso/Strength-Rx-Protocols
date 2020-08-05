import { CreateMechanism } from './CreateMechanism';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

/**
 * This creation mechanism creates an automatically generated random Firebase ID for each new document.
 */
export class CreateWithRandomID < T > implements CreateMechanism < T > {

    /**
     * Constructs a  creation mechanism that creates an automatically generated random Firebase ID for each new document.
     */
    constructor(
        public entityCollection: AngularFirestoreCollection < T >
    ) {}

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be the automatically generated document Firebase ID.
     * @param entity the entity being created
     */
    async create(entity: T): Promise < T > {
        await this.entityCollection.add(entity);
        return entity;
    }
}
