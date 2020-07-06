
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router/router.selectors';
import { Dictionary } from '@ngrx/entity';
import { profilesAdapter } from './profile.reducer';
import { ProfilesState, Profile } from './profile.state';
import * as fromAuth from '../auth/auth.selector';
import { AuthState } from '../auth/auth.state';
import * as fromRouter from '../router/router.selectors';
import { CustomRouterReducerState } from '../router/router.state';


/**
 * Gets the top-level state property named 'profiles' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
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
 * @param profileID the ID of the profile
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
    (auth: AuthState, profiles: ProfilesState) => profiles.entities[auth.userID]
);

/**
 * Select whether or not the currently viewed profile (based by route URL) belongs to the current user
 */
export const selectProfileBelongsToUser = createSelector(
    fromAuth.selectState,
    fromRouter.selectRouterState,
    selectState,
    (auth: AuthState, router: CustomRouterReducerState, profiles: ProfilesState) => {
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
 * Select all clients of the signed in user
 */
export const selectMyClients = createSelector(
    selectAllClients,
    selectUserProfile,
    (profiles, user) => profiles.filter(profile => profile.assignedTrainer.id === user.id)
);

/**
 * Select all clients who do not have an assigned trainer
 */
export const selectUnassignedClients = createSelector(
    selectAllClients,
    profiles => profiles.filter(profile => profile.assignedTrainer.id == null)
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
 * Select a boolean that represents a Request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ProfilesState) => state.requestInProgress
);
