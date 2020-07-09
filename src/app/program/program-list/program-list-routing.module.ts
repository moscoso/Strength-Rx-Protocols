import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramListPage } from './program-list.page';

const routes: Routes = [
    {
        'path': '',
        'component': ProgramListPage
    },
    {
        'path': ':id',
        'loadChildren': () => import('../program-detail/program-detail.module').then(m => m
            .ProgramDetailPageModule)
    },

];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ProgramListPageRoutingModule {}
