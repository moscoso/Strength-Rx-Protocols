import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        CalendarPageRoutingModule,
    ],
    'declarations': [CalendarPage],
})
export class CalendarPageModule {}
