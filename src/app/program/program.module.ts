import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramFormComponent } from './program-form/program-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
    'declarations': [
        ProgramFormComponent
    ],
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        MaterialsModule,
        IonicModule,
    ],
    'exports': [
        ProgramFormComponent
    ]
})
export class ProgramModule {}
