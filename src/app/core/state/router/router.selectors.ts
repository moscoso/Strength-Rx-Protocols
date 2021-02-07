import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterReducerState } from './router.state';


/**
 * Selects the top-level state property 'router' of the store tree.
 */
export const selectRouterState = createFeatureSelector < CustomRouterReducerState > ('router');

/**
 * Select the route params of a current route
 */
export const selectParams = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router ? router.state.params : {}
);

/**
 * Select the query params of a current route
 */
export const selectQueryParams = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router ? router.state.queryParams : {}
);

/**
 * Select the current URL
 */
export const selectURL = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router ? router.state.url : ''
);
