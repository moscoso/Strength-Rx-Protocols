import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DismissModalButtonComponent } from './dismiss-modal-button/dismiss-modal-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
    'imports': [
        IonicModule,
        CommonModule,
        YouTubePlayerModule
    ],
    'declarations': [YoutubePlayerComponent, DismissModalButtonComponent],
    'exports': [YouTubePlayerModule, YoutubePlayerComponent, DismissModalButtonComponent]
})
export class SharedModule {}
