import { AuthEffects } from './auth/auth.effects';
import { ExerciseEffects } from './exercises/exercises.effects';
import { WorkoutEffects } from './workouts/workouts.effects';
import { ProfileEffects } from './profile/profile.effects';
import { CheckInEffects } from './check-ins/check-in.effects';
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
