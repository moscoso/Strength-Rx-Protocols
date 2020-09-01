import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';


 /* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */

/**
 * Gets the top-level state property named 'exercises' of the store tree.
 */
export const selectState = createFeatureSelector < AuthState > ('auth');

/**
 * Select the user ID
 */
export const selectUserID = createSelector(
    selectState,
    (state: AuthState) => state.userID
);

/**
 * Select the authentication data belonging to the signed-in User
 */
export const selectUserData = createSelector(
    selectState,
    (state: AuthState) => state.userData
);

/**
 * Select the flag that indicates whether the user is authenticated
 */
export const selectAuthenticated = createSelector(
    selectState,
    (state: AuthState) => state.isAuthenticated
);
