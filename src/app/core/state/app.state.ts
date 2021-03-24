import { ExercisesState } from './exercise/exercise.state';
import { WorkoutState } from './workout/workout.state';
import { CustomRouterReducerState } from './router/router.state';
import { ProfilesState } from './profile/profile.state';
import { CheckInsState } from './check-in/check-in.state';
import { ProgramsState } from './program/program.state';
import { ClientsState } from './client/client.state';
import { ChatState } from './chat/chat.state';
import { AuthModel } from './auth/auth.model';

export interface AppState {
    'auth': AuthModel;
    'chat': ChatState;
    'clients': ClientsState;
    'check-ins': CheckInsState;
    'exercises': ExercisesState;
    'programs': ProgramsState;
    'profiles': ProfilesState;
    'router': CustomRouterReducerState;
    'workouts': WorkoutState;
}
