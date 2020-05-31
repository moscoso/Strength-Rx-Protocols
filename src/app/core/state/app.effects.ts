import { AuthEffects } from './auth/auth.effects';
import { ExerciseEffects } from './exercises/exercises.effects';
import { WorkoutEffects } from './workouts/workouts.effects';
import { ProfileEffects } from './profile/profile.effects';

export const appEffects = [
    AuthEffects,
    ExerciseEffects,
    ProfileEffects,
    WorkoutEffects,
];
