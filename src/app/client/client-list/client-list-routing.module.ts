import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainerGuard } from 'src/app/guards/trainer/trainer.guard';

import { ClientListPage } from './client-list.page';

const routes: Routes = [
{
    'path': '',
    'component': ClientListPage,
    'canActivate': [TrainerGuard],
}];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ClientListPageRoutingModule {}
