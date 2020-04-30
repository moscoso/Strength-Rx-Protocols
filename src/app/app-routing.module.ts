import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    'path': '',
    'redirectTo': 'folder/Inbox',
    'pathMatch': 'full'
  },
  {
    'path': 'exercises',
    'loadChildren': () => import('./exercises/exercises.module').then( m => m.ExercisesPageModule)
  },
];

@NgModule({
  'imports': [
    RouterModule.forRoot(routes, { 'preloadingStrategy': PreloadAllModules })
  ],
  'exports': [RouterModule]
})
export class AppRoutingModule {}
