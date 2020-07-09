import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramDetailPage } from './program-detail.page';

const routes: Routes = [
{
    'path': '',
    'component': ProgramDetailPage
}];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ProgramDetailPageRoutingModule {}
