import { RouterReducerState } from '@ngrx/router-store';

import { AuthState } from './auth/auth.state';
import { ExercisesState } from './exercises/exercises.state';


export interface AppState {
    auth: AuthState;
    exercises: ExercisesState;
    router: RouterReducerState;
}
