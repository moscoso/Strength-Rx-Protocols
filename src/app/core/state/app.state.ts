import { AuthState } from './auth/auth.state';
import { ExerciseState } from './exercise/exercise.state';


export interface AppState {
    auth: AuthState;
    exercise: ExerciseState;
}
