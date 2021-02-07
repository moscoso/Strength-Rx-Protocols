import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Client } from './client.model';


/**
 * Clients are represented by an EntityState that
 * includes a dictionary of clients and the
 * list of ids that corresponds to each client
 */
export interface ClientsState extends EntityState < Client > {
    requestInProgress: boolean;
    error: any | null;
    initialized: boolean;
}

export const clientsAdapter = createEntityAdapter < Client > ({
    'selectId': client => client.id,
    'sortComparer': (clientA, clientB) => clientA.lastName.localeCompare(clientB.lastName)
});

export const CLIENTS_INIT_STATE: ClientsState = clientsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
    'initialized': false,
});

