import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';



@NgModule({
    'imports': [
        CommonModule,
        YouTubePlayerModule
    ],
    'declarations': [YoutubePlayerComponent],
    'exports': [YouTubePlayerModule, YoutubePlayerComponent]
})
export class SharedModule {}
