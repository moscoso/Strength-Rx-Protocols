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
];

@NgModule({
  'imports': [
    RouterModule.forRoot(routes, { 'preloadingStrategy': PreloadAllModules })
  ],
  'exports': [RouterModule]
})
export class AppRoutingModule {}
