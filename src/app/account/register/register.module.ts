import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { MaterialsModule } from 'src/app/materials.module';
import { RegisterPage } from './register.page';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialsModule,
        RegisterPageRoutingModule
    ],
    'declarations': [RegisterPage]
})
export class RegisterPageModule {}
