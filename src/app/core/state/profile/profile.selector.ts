
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router/router.selectors';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { profilesAdapter } from './profile.reducer';
import { ProfilesState, Profile } from './profile.state';

/**
 * Gets the top-level state property named 'exercises' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const selectState = createFeatureSelector < ProfilesState > ('workouts');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = profilesAdapter.getSelectors(selectState);

/**
 * Select an Exercise by ID
 * @param exerciseID the ID of the exercise
 */
export const selectProfileByID = (exerciseID: string) => createSelector(
    selectState,
    (state: ProfilesState) => state.entities[exerciseID]
);

/**
 * Use the router state's URL to select an Exercise by ID.
 */
export const selectProfileByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Profile>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.orderID];
    }
);
