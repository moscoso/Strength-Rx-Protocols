import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { exercisesReducer } from './exercises/exercises.reducer';
import { workoutsReducer } from './workouts/workouts.reducer';
import { profilesReducer } from './profile/profile.reducer';
import { checkInsReducer } from './check-ins/check-in.reducer';
import { foodsReducer } from './food/food.reducer';
import { mealsReducer } from './meals/meals.reducer';
import { programsReducer } from './program/program.reducer';
import { clientsReducer } from './client/client.reducer';
import { chatReducer } from './chat/chat.reducer';

/**
 * The root reducer for the app's ngrx/store
 */
export const appReducers: ActionReducerMap < AppState > = {
    'auth': authReducer,
    'chat': chatReducer,
    'clients': clientsReducer,
    'check-ins': checkInsReducer,
    'exercises': exercisesReducer,
    'foods': foodsReducer,
    'meals': mealsReducer,
    'programs': programsReducer,
    'profiles': profilesReducer,
    'router': routerReducer,
    'workouts': workoutsReducer,
};


