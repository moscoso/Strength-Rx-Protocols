import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramFormComponent } from './program-form/program-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { IonicModule } from '@ionic/angular';
import { ProgramPreviewComponent } from './program-preview/program-preview.component';



@NgModule({
    'declarations': [
        ProgramFormComponent,
        ProgramPreviewComponent,
    ],
    'imports': [
        CommonModule,
        ReactiveFormsModule,
        MaterialsModule,
        IonicModule,
    ],
    'exports': [
        ProgramFormComponent,
        ProgramPreviewComponent,
    ]
})
export class ProgramModule {}
