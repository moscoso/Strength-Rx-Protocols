import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInListComponent } from './components/check-in-list/check-in-list.component';
import { WeeklyCheckInComponent } from './components/weekly-check-in/weekly-check-in.component';
import { WeightCheckInComponent } from './components/weight-check-in/weight-check-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from '../pipes/pipe.module';



@NgModule({
    'declarations': [
        CheckInListComponent,
        WeeklyCheckInComponent,
        WeightCheckInComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        FormsModule,
        MaterialsModule,
        ReactiveFormsModule,
        PipeModule,
    ],
    'exports': [
        CheckInListComponent,
        WeeklyCheckInComponent,
        WeightCheckInComponent,
    ]
})
export class CheckInModule {}
