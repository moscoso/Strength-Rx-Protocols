
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router/router.selectors';
import { Dictionary } from '@ngrx/entity';
import { clientsAdapter, ClientsState,  } from './client.state';
import * as fromAuth from '../auth/auth.selector';
import * as fromRouter from '../router/router.selectors';
import { CustomRouterReducerState } from '../router/router.state';
import { AuthModel } from '../auth/auth.model';
import { Client } from './client.model';


/**
 * Selects the top-level state property 'clients' of the store tree.
 */
export const selectState = createFeatureSelector < ClientsState > ('clients');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = clientsAdapter.getSelectors(selectState);

/**
 * Select a Client by ID
 * @param clientID the unique identifier of the client
 */
export const selectClientByID = (clientID: string) => createSelector(
    selectState,
    (state: ClientsState) => state.entities[clientID]
);

/**
 * Select the authenticated user as a client
 */
export const selectUserAsClient = createSelector(
    fromAuth.selectState,
    selectState,
    (auth: AuthModel, clients: ClientsState) => clients.entities[auth.userID]
);

/**
 * Select whether or not the currently viewed client (based by route URL) belongs to the current user
 */
export const selectClientBelongsToUser = createSelector(
    fromAuth.selectState,
    fromRouter.selectRouterState,
    selectState,
    (auth: AuthModel, router: CustomRouterReducerState, clients: ClientsState) => {
        const routeID = router.state.params.id;
        const userID = auth.userID;
        const clientExists = clients[userID] != null;
        const matchesID = routeID === userID;
        const routeIDMissing = routeID == null;
        return  clientExists && (matchesID || routeIDMissing);
    }
);

/**
 * Select all clients of the signed in user
 */
export const selectMyClients = createSelector(
    selectAll,
    fromAuth.selectUserID,
    (clients, userID) => clients.filter(client => client.assignedTrainer.id === userID)
);

/**
 * Select all clients who do not have an assigned trainer
 */
export const selectUnassignedClients = createSelector(
    selectAll,
    clients => clients.filter(client => client.assignedTrainer.id == null)
);

/**
 * Use the router state's URL to select an Client by ID.
 */
export const selectClientByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Client>, router: CustomRouterReducerState) => {
        const routeID = router.state.params.id;
        return entities[routeID];
    }
);

/**
 * Select a boolean that indicates a request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ClientsState) => state.requestInProgress
);
