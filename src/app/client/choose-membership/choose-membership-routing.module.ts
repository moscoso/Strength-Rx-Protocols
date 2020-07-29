import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseMembershipPage } from './choose-membership.page';

const routes: Routes = [
{
    'path': '',
    'component': ChooseMembershipPage
}];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ChooseMembershipPageRoutingModule {}
