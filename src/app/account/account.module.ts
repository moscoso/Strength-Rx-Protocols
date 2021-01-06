import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
    'declarations': [LogoutButtonComponent],
    'imports': [
        CommonModule,
        IonicModule,
    ],
    'exports': [LogoutButtonComponent],
})
export class AccountModule {}
