import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    'path': '',
    'redirectTo': 'exercises',
    'pathMatch': 'full'
  },
  {
    'path': 'exercises',
    'loadChildren': () => import('./exercises/exercises.module').then( m => m.ExercisesPageModule)
  },
  {
    'path': 'create-exercise',
    'loadChildren': () => import('./create-exercise/create-exercise.module').then( m => m.CreateExercisePageModule)
  },
  {
    'path': 'login',
    'loadChildren': () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    'path': 'register',
    'loadChildren': () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    'path': 'workouts',
    'loadChildren': () => import('./workouts/workouts.module').then( m => m.WorkoutsPageModule)
  },
  {
    'path': 'create-workout',
    'loadChildren': () => import('./create-workout/create-workout.module').then( m => m.CreateWorkoutPageModule)
  },
];

@NgModule({
  'imports': [
    RouterModule.forRoot(routes, { 'preloadingStrategy': PreloadAllModules })
  ],
  'exports': [RouterModule]
})
export class AppRoutingModule {}
