
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mealsAdapter } from './meals.reducer';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { MealsState, Meal } from './meals.state';
import { selectRouterState } from '../router/router.selectors';

/**
 * Gets the top-level state property named 'meals' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const selectState = createFeatureSelector < MealsState > ('meals');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = mealsAdapter.getSelectors(selectState);

/**
 * Select an Meal by ID
 * @param mealID the ID of the meal
 */
export const selectMealByID = (mealID: string) => createSelector(
    selectState,
    (state: MealsState) => state.entities[mealID]
);

/**
 * Use the router state's URL to select an Meal by ID.
 */
export const selectMealByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Meal>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.id];
    }
);

/**
 * Select a boolean that represents a Request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: MealsState) => state.requestInProgress
);
