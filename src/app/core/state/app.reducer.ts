import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { exercisesReducer } from './exercises/exercises.reducer';
import { workoutsReducer } from './workouts/workouts.reducer';

export const appReducers: ActionReducerMap < AppState > = {
    'auth': authReducer,
    'exercises': exercisesReducer,
    'workouts': workoutsReducer,
    'router': routerReducer,
};


