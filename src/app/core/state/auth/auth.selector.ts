import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthModel } from './auth.model';

/**
 * Selects the top-level state property 'auth' of the store tree.
 */
export const selectState = createFeatureSelector < AuthModel > ('auth');

/**
 * Select the user ID
 */
export const selectUserID = createSelector(
    selectState,
    (state: AuthModel) => state.userID
);

/**
 * Select the authentication data belonging to the signed-in User
 */
export const selectUserData = createSelector(
    selectState,
    (state: AuthModel) => state.userData
);

/**
 * Select the flag that indicates whether the user is authenticated
 */
export const selectAuthenticated = createSelector(
    selectState,
    (state: AuthModel) => state.isAuthenticated
);
