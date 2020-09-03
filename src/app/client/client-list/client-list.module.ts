import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientListPageRoutingModule } from './client-list-routing.module';

import { ClientListPage } from './client-list.page';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        ClientListPageRoutingModule,
        PipeModule,
    ],
    'declarations': [ClientListPage]
})
export class ClientListPageModule {}
