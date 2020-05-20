import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export const selectRouterState = createFeatureSelector('router');

export const selectURL = createSelector(
    selectRouterState,
    (router: RouterReducerState<any>) => {
        return router && router.state && router.state.url;
    }
);
