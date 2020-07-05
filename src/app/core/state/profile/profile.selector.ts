
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router/router.selectors';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { profilesAdapter } from './profile.reducer';
import { ProfilesState, Profile } from './profile.state';
import * as fromAuth from '../auth/auth.selector';
import { AuthState } from '../auth/auth.state';

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
 * Select the authenticated user to see if the user is a trainer
 */
export const selectUserIsTrainer =  createSelector(
    selectUserProfile,
    profile => profile.isTrainer
);

/**
 * Select all clients (essentially everyone who is not a trainer)
 */
export const selectAllClients = createSelector(
    selectAll,
    profiles => profiles.filter(profile => !profile.isTrainer),
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
    (entities: Dictionary<Profile>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.orderID];
    }
);

/**
 * Select a boolean that represents a Request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ProfilesState) => state.requestInProgress
);
