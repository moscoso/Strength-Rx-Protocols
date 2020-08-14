import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from './user-item/user-item';
import { IonicModule } from '@ionic/angular';
import { GoToConversationButtonComponent } from './go-to-conversation-button/go-to-conversation-button.component';
import { RouterModule } from '@angular/router';



@NgModule({
    'declarations': [
        UserItemComponent,
        GoToConversationButtonComponent,
    ],
    'imports': [
        CommonModule,
        IonicModule,
        RouterModule,
    ],
    'exports': [
        UserItemComponent,
        GoToConversationButtonComponent,
    ]
})
export class ChatModule {}
