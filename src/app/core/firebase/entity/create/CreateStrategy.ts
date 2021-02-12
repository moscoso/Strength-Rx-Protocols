/**
 * This strategy provides an interface that specifies the behavior of how
 * entities are to be created in Firestore
 */
export interface CreateStrategy<T> {
    /**
     * The behavior to create an entity
     */
    create(entity: T): Promise < T >;
}

