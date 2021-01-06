import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { ProfileGuard } from 'src/app/guards/profile/profile.guard';

import { ProgramListPage } from './program-list.page';

const routes: Routes = [
    {
        'path': '',
        'component': ProgramListPage
    },
    {
        'path': ':programID',
        'loadChildren': () => import('../program-detail/program-detail.module').then(m => m
            .ProgramDetailPageModule)
    },
    {
        'path': ':programID/:phase/:day',
        'loadChildren': () => import('../../workout/workout-detail/workout-detail.module').then(m => m
            .WorkoutDetailPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    }

];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ProgramListPageRoutingModule {}
