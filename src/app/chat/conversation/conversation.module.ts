import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConversationPage } from './conversation.page';
import { ChatModule } from '../chat.module';
import { PipeModule } from 'src/app/pipes/pipe.module';


const routes: Routes = [
{
    'path': '',
    'component': ConversationPage
}];

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ChatModule,
        PipeModule,
    ],
    'declarations': [ConversationPage],
    'providers': []
})
export class ConversationPageModule {}
