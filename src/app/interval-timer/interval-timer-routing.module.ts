import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntervalTimerPage } from './interval-timer.page';

const routes: Routes = [
  {
    path: '',
    component: IntervalTimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntervalTimerPageRoutingModule {}
