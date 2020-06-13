import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseListPage } from './exercise-list.page';

const routes: Routes = [
{
    'path': '',
    'component': ExerciseListPage,
},
{
    'path': ':id',
    'loadChildren': () => import('../exercise-detail/exercise-detail.module').then(m => m.ExerciseDetailPageModule)
}, ];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ExerciseListPageRoutingModule {}
