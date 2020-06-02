
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { foodsAdapter } from './food.reducer';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { FoodsState, Food } from './food.state';
import { selectRouterState } from '../router/router.selectors';

/**
 * Gets the top-level state property named 'foods' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const selectState = createFeatureSelector < FoodsState > ('foods');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = foodsAdapter.getSelectors(selectState);

/**
 * Select an Food by ID
 * @param foodID the ID of the food
 */
export const selectFoodByID = (foodID: string) => createSelector(
    selectState,
    (state: FoodsState) => state.entities[foodID]
);

/**
 * Use the router state's URL to select an Food by ID.
 */
export const selectFoodByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Food>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.id];
    }
);
