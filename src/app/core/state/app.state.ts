import { AuthState } from './auth/auth.state';
import { ExercisesState } from './exercises/exercises.state';
import { WorkoutsState } from './workouts/workouts.state';
import { CustomRouterReducerState } from './router/router.state';
import { ProfilesState } from './profile/profile.state';


export interface AppState {
    auth: AuthState;
    exercises: ExercisesState;
    workouts: WorkoutsState;
    profiles: ProfilesState;
    router: CustomRouterReducerState;
}
