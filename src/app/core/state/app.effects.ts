import { AuthEffects } from './auth/auth.effects';
import { ExerciseEffects } from './exercises/exercises.effects';
import { WorkoutEffects } from './workouts/workouts.effects';
import { ProfileEffects } from './profile/profile.effects';
import { CheckInEffects } from './check-ins/check-in.effects';

export const appEffects = [
    AuthEffects,
    CheckInEffects,
    ExerciseEffects,
    ProfileEffects,
    WorkoutEffects,
];
