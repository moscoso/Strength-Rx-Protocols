
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckInsState } from './check-in.state';
import { checkInsAdapter } from './check-in.reducer';

/**
 * Gets the top-level state property named 'checkIns' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const selectState = createFeatureSelector < CheckInsState > ('check-ins');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = checkInsAdapter.getSelectors(selectState);

/**
 * Select an CheckIn by ID
 * @param checkInID the ID of the checkIn
 */
export const selectCheckInByID = (checkInID: string) => createSelector(
    selectState,
    (state: CheckInsState) => state.entities[checkInID]
);

/**
 * Use the router state's URL to select an CheckIn by ID.
 */
// export const selectCheckInByRouteURL = createSelector(
//     selectEntities,
//     selectRouterState,
//     (entities: Dictionary<CheckIn>, router: RouterReducerState<any>) => {
//         return router.state && entities[router.state.params.orderID];
//     }
// );
