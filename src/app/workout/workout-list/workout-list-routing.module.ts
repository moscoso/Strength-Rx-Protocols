import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainerGuard } from 'src/app/guards/trainer/trainer.guard';
import { WorkoutListPage } from './workout-list.page';


const routes: Routes = [
{
    'path': '',
    'component': WorkoutListPage,
    'canActivate': [TrainerGuard]
},
{
    'path': ':id',
    'loadChildren': () => import('../workout-detail/workout-detail.module').then(m => m
        .WorkoutDetailPageModule)
}, ];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class WorkoutListPageRoutingModule {}
