export interface CreateMechanism<T> {
    create(entity: T): Promise < T >;
}
