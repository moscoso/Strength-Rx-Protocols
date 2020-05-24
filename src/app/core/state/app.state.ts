import { RouterReducerState } from '@ngrx/router-store';

import { AuthState } from './auth/auth.state';
import { ExercisesState } from './exercises/exercises.state';
import { WorkoutsState } from './workouts/workouts.state';


export interface AppState {
    auth: AuthState;
    exercises: ExercisesState;
    workouts: WorkoutsState;
    router: RouterReducerState;
}
