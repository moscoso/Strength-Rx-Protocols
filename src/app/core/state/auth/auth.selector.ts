import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectState = createFeatureSelector < AuthState > ('auth');

export const selectUserID = createSelector(
    selectState,
    (state: AuthState) => state.userID
);
