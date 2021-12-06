import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { IonicModule } from '@ionic/angular';
import { ChooseMembershipComponent } from './components/choose-membership/choose-membership.component';
import { JoinFormComponent } from './components/join-form/join-form.component';
import { MaterialsModule } from '../materials.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    'declarations': [
        ChooseMembershipComponent,
        JoinFormComponent,
        LogoutButtonComponent
    ],
    'imports': [
        CommonModule,
        IonicModule,
        MaterialsModule,
        ReactiveFormsModule,
    ],
    'exports': [
        ChooseMembershipComponent,
        JoinFormComponent,
        LogoutButtonComponent
    ],
})
export class AccountModule {}
