
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Dictionary } from '@ngrx/entity';
import { selectRouterState } from '../router/router.selectors';
import { RouterReducerState } from '@ngrx/router-store';
import { CheckIn } from './check-in.model';
import { CheckInsState, checkInsAdapter } from './check-in.state';

/**
 * Selects the top-level state property 'check-ins' of the store tree.
 */
export const selectState = createFeatureSelector < CheckInsState > ('check-ins');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = checkInsAdapter.getSelectors(selectState);

/**
 * Select a check-in by ID
 * @param checkInID the unique identifier of the checkIn
 */
export const selectCheckInByID = (checkInID: string) => createSelector(
    selectState,
    (state: CheckInsState) => state.entities[checkInID]
);

/**
 * Use the router state's URL to select an CheckIn by ID.
 */
export const selectCheckInByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<CheckIn>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.orderID];
    }
);

/**
 * Select a boolean that represents a Request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: CheckInsState) => state.requestInProgress
);
