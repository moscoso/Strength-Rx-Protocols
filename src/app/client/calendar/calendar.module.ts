import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { HeightMatchWidthDirective } from './height-match-width.directive';
import { WorkoutModule } from 'src/app/workout/workout.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        CalendarPageRoutingModule,
        WorkoutModule,
    ],
    'declarations': [CalendarPage, HeightMatchWidthDirective, ],
})
export class CalendarPageModule {}
