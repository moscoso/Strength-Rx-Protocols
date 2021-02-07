
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { RouterReducerState } from '@ngrx/router-store';
import { ProgramsState, programsAdapter } from './program.state';
import { selectRouterState } from '../router/router.selectors';
import { Program } from './program.model';


/**
 * Selects the top-level state property 'programs' of the store tree.
 */
export const selectState = createFeatureSelector < ProgramsState > ('programs');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = programsAdapter.getSelectors(selectState);

/**
 * Select a Program by ID
 * @param programID the unique identifier of the program
 */
export const selectProgramByID = (programID: string) => createSelector(
    selectState,
    (state: ProgramsState) => state.entities[programID]
);

/**
 * Use the router state's URL to select a Program by ID.
 */
export const selectProgramByRouteURL = createSelector(
    selectEntities,
    selectRouterState,
    (entities: Dictionary<Program>, router: RouterReducerState<any>) => {
        return router.state && entities[router.state.params.programID];
    }
);

/**
 * Select a boolean that indicates a a request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: ProgramsState) => state.requestInProgress
);
