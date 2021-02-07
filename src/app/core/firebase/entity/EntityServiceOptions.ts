/**
 * An options object that configures the EntityService
 */
export interface EntityServiceOptions < T > {
    /**
     * Specifies the behavior of `create()` calls by `EntityService` which determines
     * how IDs for newly created entities are generated
     */
    IDSource ?: IDCreateBehavior;
    /**
     * The default entity for the service will provide default values for any missing data fields from Firestore documents.
     */
    defaultEntity ?: T;
}

/**
 * Specifies the behavior of `create()` calls on `EntityService` which determines
 * how IDs for newly created entities are generated
 *
 * Setting to `name` will create an ID from a slug of the entity's name field.
 *
 * Setting to `authorizedUser` will create an ID that matches the authorized user.
 *
 * Setting to `random` causes Firestore to randomly generate a document ID for the entity
 */
export type IDCreateBehavior = 'name' | 'authorizedUser' | 'random';

/**
 * By default, the Entity Service uses a IDCreateBehavior of `random` and has an empty object for a default value
 */
export const DEFAULT_ENTITY_SERVICE_OPTIONS: EntityServiceOptions < any > = {
    'IDSource': 'random',
    'defaultEntity': {},
};
