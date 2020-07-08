import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DismissModalButtonComponent } from './dismiss-modal-button/dismiss-modal-button.component';
import { IonicModule } from '@ionic/angular';
import { MenuListComponent } from './menu-list/menu-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
    'imports': [
        IonicModule,
        RouterModule,
        CommonModule,
        YouTubePlayerModule
    ],
    'declarations': [YoutubePlayerComponent, DismissModalButtonComponent, MenuListComponent],
    'exports': [YouTubePlayerModule, YoutubePlayerComponent, DismissModalButtonComponent, MenuListComponent]
})
export class SharedModule {}
