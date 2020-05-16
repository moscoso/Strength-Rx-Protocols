import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromExercises from './exercises/exercises.selector';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { exercisesReducer } from './exercises/exercises.reducer';
import { Dictionary } from '@ngrx/entity';
import { Exercise } from './exercises/exercises.state';

export const appReducers: ActionReducerMap < AppState > = {
    'auth': authReducer,
    'exercises': exercisesReducer,
    'router': routerReducer,
};


const getRouterState = createFeatureSelector('router');
const getRouteToExerciseByID = createSelector(
    fromExercises.selectEntities,
    getRouterState,
    (entities: Dictionary<Exercise>, router: any) => {
        return router.state && entities[router.state.params.orderID];
    }
);
