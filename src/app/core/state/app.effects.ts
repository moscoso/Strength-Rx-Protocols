import { AuthEffects } from './auth/auth.effects';
import { ExerciseEffects } from './exercise/exercise.effects';
import { WorkoutEffects } from './workout/workout.effects';
import { ProfileEffects } from './profile/profile.effects';
import { CheckInEffects } from './check-in/check-in.effects';
import { ProgramEffects } from './program/program.effects';
import { ClientEffects } from './client/client.effects';
import { ChatEffects } from './chat/chat.effects';

export const appEffects = [
    AuthEffects,
    ChatEffects,
    CheckInEffects,
    ClientEffects,
    ExerciseEffects,
    ProfileEffects,
    ProgramEffects,
    WorkoutEffects,
];
