import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterReducerState } from './router.state';

export const selectRouterState = createFeatureSelector < any, any> ('router');


export const selectParams = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router.state.params
);

export const selectQueryParams = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router.state.queryParams
);

export const selectURL = createSelector(
    selectRouterState,
    (router: CustomRouterReducerState) => router.state.url
);
