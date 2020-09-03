import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressPicsPage } from './progress-pics.page';

const routes: Routes = [
{
    'path': '',
    'component': ProgressPicsPage
}];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ProgressPicsPageRoutingModule {}
