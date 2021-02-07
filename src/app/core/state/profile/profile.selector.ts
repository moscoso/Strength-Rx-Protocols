
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router/router.selectors';
import { Dictionary } from '@ngrx/entity';
import { profilesAdapter, ProfilesState } from './profile.state';
import * as fromAuth from '../auth/auth.selector';
import * as fromRouter from '../router/router.selectors';
import { CustomRouterReducerState } from '../router/router.state';
import { Profile } from './profile.model';
import { AuthModel } from '../auth/auth.model';

/**
 * Selects the top-level state property 'profile' of the store tree.
 */
export const selectState = createFeatureSelector < ProfilesState > ('profiles');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = profilesAdapter.getSelectors(selectState);

/**
 * Select a Profile by ID
 * @param profileID the unique identifier of the profile
 */
export const selectProfileByID = (profileID: string) => createSelector(
    selectState,
    (state: ProfilesState) => state.entities[profileID]
);

/**
 * Select the authenticated user's profile
 */
export const selectUserProfile = createSelector(
    fromAuth.selectState,
    selectState,
    (auth: AuthModel, profiles: ProfilesState) => profiles.entities[auth.userID]
);

/**
 * Select a boolean indicating whether or not the currently viewed profile (based by route URL)
 * belongs to the currently authorized user
 */
export const selectProfileBelongsToUser = createSelector(
    fromAuth.selectState,
    fromRouter.selectRouterState,
    selectState,
    (auth: AuthModel, router: CustomRouterReducerState, profiles: ProfilesState) => {
        const routeID = router.state.params.id;
        const userID = auth.userID;
        return userID === routeID || routeID == null;
    }
);

/**
 * Select the authenticated user to see if the user is a trainer
 */
export const selectUserIsTrainer =  createSelector(
    selectUserProfile,
    profile => profile && profile.isTrainer
);

/**
 * Select all clients
 */
export const selectAllClients = createSelector(
    selectAll,
    profiles => profiles.filter(profile => profile.isClient),
);


/**
 * Select all trainers (essentially everyone who is not a trainer)
 */
export const selectAllTrainers = createSelector(
    selectAll,
    profiles => profiles.filter(profile => profile.isTrainer),
);


/**
 * Use the router state's URL to select an Profile by ID.
 */
export const selectProfileByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Profile>, router: CustomRouterReducerState) => {
        const routeID = router.state.params.id;
        return entities[routeID];
    }
);

/**
 * Select a flag that indicates a request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ProfilesState) => state.requestInProgress
);
