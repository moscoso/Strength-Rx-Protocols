import { CreateStrategy } from './CreateStrategy';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

/**
 * This strategy creates an ID based on the unique identifier of the authorized user
 */
export class CreateIDFromAuthUser < T > implements CreateStrategy < T > {

    constructor(
        protected functions: AngularFireFunctions,
        protected collectionName: string,
    ) {
        if (!functions) {
            const errorMessage =
                `Cannot create CreateIDFromAuthUser mechanism because AngularFireFunctions is undefined`;
            throw new Error(errorMessage);
        }
    }

    /**
     * Create a new Firestore document for the entity.
     * @note the unique identifier of the entity will correspond with the unique identifier of the authorized user.
     * @param entity the entity being created
     */
    async create(entity: any): Promise < T > {
        const fun = this.functions.httpsCallable('createEntity');
        const response = await fun({
            'entity': entity,
            'collection': this.collectionName,
            'docID': entity.id,
        }).toPromise();
        return response;
    }
}
