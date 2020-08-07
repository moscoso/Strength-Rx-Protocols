import { CreateMechanism } from './CreateMechanism';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { AngularFireFunctions } from '@angular/fire/functions';

/**
 * This creation mechanism creates an ID based on the ID of the authorized user
 */
export class CreateIDFromAuthUser < T > implements CreateMechanism < T > {

    /**
     * Constructs a creation mechanism that creates an ID based on the ID of the authorized user
     */
    constructor(
        protected functions: AngularFireFunctions,
    ) {
        if (!functions) {
            const errorMessage =
                `Cannot create CreateIDFromAuthUser mechanism because AngularFireFunctions is undefined`;
            throw new Error(errorMessage);
        }
    }

    /**
     * Create a new Firestore document for the entity.
     * The ID of the entity will be a slug of the entity name.
     * @param entity the entity being created
     */
    async create(entity: T): Promise < T > {
        const fun = this.functions.httpsCallable('createEntity');
        const response = await fun({
            'entity': entity
        }).toPromise();
        return response;
    }
}
