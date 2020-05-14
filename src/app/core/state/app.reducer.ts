import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { exercisesReducer } from './exercises/exercises.reducer';

export const appReducers: ActionReducerMap < AppState > = {
    'auth': authReducer,
    'exercise': exercisesReducer,
    'router': routerReducer,
};
