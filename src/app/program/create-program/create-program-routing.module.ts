import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProgramPage } from './create-program.page';

const routes: Routes = [
{
    'path': '',
    'component': CreateProgramPage
}];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class CreateProgramPageRoutingModule {}
