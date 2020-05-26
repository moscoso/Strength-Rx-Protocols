import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercisesPage } from './exercises.page';

const routes: Routes = [
{
    'path': '',
    'component': ExercisesPage
},
{
    'path': 'exercise',
    'loadChildren': () => import('./exercise/exercise.module').then(m => m.ExercisePageModule)
}];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ExercisesPageRoutingModule {}
