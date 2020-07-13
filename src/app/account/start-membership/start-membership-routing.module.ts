import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartMembershipPage } from './start-membership.page';

const routes: Routes = [
{
    'path': '',
    'component': StartMembershipPage
}];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class StartMembershipPageRoutingModule {}
