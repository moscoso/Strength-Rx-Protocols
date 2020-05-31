import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { exercisesReducer } from './exercises/exercises.reducer';
import { workoutsReducer } from './workouts/workouts.reducer';
import { profilesReducer } from './profile/profile.reducer';

/**
 * The root reducer for the app's ngrx/store
 */
export const appReducers: ActionReducerMap < AppState > = {
    'auth': authReducer,
    'exercises': exercisesReducer,
    'profiles': profilesReducer,
    'router': routerReducer,
    'workouts': workoutsReducer,
};


