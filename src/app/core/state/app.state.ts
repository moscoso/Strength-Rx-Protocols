import { AuthState } from './auth/auth.state';
import { ExercisesState } from './exercises/exercises.state';


export interface AppState {
    auth: AuthState;
    exercise: ExercisesState;
}
