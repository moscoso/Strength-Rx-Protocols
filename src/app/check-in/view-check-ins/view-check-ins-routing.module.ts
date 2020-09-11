import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCheckInsPage } from './view-check-ins.page';

const routes: Routes = [
{
    'path': '',
    'component': ViewCheckInsPage
}];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ViewCheckInsPageRoutingModule {}
