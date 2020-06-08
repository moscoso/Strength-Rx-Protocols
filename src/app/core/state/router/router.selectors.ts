import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterReducerState } from './router.state';

/**
 * Select the router state
 */
export const selectRouterState = createFeatureSelector < CustomRouterReducerState > ('router');

/**
 * Select the route params of a current route
 */
export const selectParams = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router.state.params
);

/**
 * Select the query params of a current route
 */
export const selectQueryParams = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router.state.queryParams
);

/**
 * Select the current URL
 */
export const selectURL = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router.state.url
);
