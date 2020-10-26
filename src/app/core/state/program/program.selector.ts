
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { programsAdapter } from './program.reducer';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { ProgramsState, Program } from './program.state';
import { selectRouterState } from '../router/router.selectors';

/**
 * Gets the top-level state property named 'programs' of the store tree.
 */
/* Note: createFeatureSelector allows us to get a top-level feature state
 * property of the state tree simply by calling it out by its feature name.
 */
export const selectState = createFeatureSelector < ProgramsState > ('programs');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = programsAdapter.getSelectors(selectState);

/**
 * Select an Program by ID
 * @param programID the ID of the program
 */
export const selectProgramByID = (programID: string) => createSelector(
    selectState,
    (state: ProgramsState) => state.entities[programID]
);

/**
 * Use the router state's URL to select an Program by ID.
 */
export const selectProgramByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Program>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.programID];
    }
);

/**
 * Select a boolean that represents a Request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ProgramsState) => state.requestInProgress
);
